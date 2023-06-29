import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from './TextField';
import ColorPicker from './ColorPicker';
import type { Color } from '@/constants/colors';
import useAlertContext from '@/hooks/useAlertContext';
import { RoomApiService } from '@/services/room_api_service';
import { useApiService } from '@/hooks/useApiService';
import useValidateRoomNameUniqueness from '@/hooks/validators/useValidateRoomNameUniqueness';
import { KeyedMutator } from 'swr';
import RoomDto from '@/dtos/room_dto';
import Button from './Button';
import AnimatedDetails from './AnimatedDetails';

interface NewRoomFormInputs {
  name: string;
  color: Color;
}

interface NewRoomFormProps {
  mutateRooms: KeyedMutator<RoomDto[]>;
}

const NewRoomForm = ({ mutateRooms }: NewRoomFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<NewRoomFormInputs>({
    defaultValues: { name: '', color: 'blue' },
    shouldFocusError: true,
  });

  const { alertService } = useAlertContext();

  const roomApiService = useApiService(RoomApiService);

  const validateRoomNameUniqueness = useValidateRoomNameUniqueness();

  const onSubmit: SubmitHandler<NewRoomFormInputs> = async ({
    name,
    color,
  }) => {
    const response = await roomApiService.create({ name, color });
    if (response) {
      reset();
      mutateRooms();
    } else {
      setFocus('name');
    }
  };

  useEffect(() => {
    if (errors.name) {
      alertService.sendAlert({
        severity: 'failure',
        title: 'Room Creation Error',
        message: errors.name.message || 'unknow error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.name]);

  return (
    <AnimatedDetails
      openedMaxHeightClass="open:max-h-44"
      className="max-h-[54px] open:max-h-44 duration-200"
      summaryProps={{
        className: 'text-2xl',
        children: 'New Room',
      }}
    >
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="mr-3">
          <TextField
            label="Name"
            {...register('name', {
              required: 'Room name is required!',
              validate: { uniqueness: validateRoomNameUniqueness },
            })}
          />
        </div>
        <div className="mr-3">
          <ColorPicker label="Color" {...register('color')} />
        </div>
        <Button type="submit">CREATE</Button>
      </form>
    </AnimatedDetails>
  );
};

export default NewRoomForm;
