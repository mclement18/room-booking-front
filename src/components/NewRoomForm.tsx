import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from './TextField';
import ColorPicker from './ColorPicker';
import type { Color } from '@/constants/colors';
import useAlertContext from '@/hooks/useAlertContext';
import { RoomApiService } from '@/services/room_api_service';
import { useApiService } from '@/hooks/useApiService';
import useValidateRoomNameUniqueness from '@/hooks/validators/useValidateRoomNameUniqueness';

interface NewRoomFormInputs {
  name: string;
  color: Color;
}

const NewRoomForm = () => {
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
    <details>
      <summary className="text-2xl mb-5 cursor-pointer w-max">New Room</summary>
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
        <button
          type="submit"
          className="
            border border-electric-green-700 px-1
            hover:bg-electric-green-600 hover:border-electric-green-400
            active:bg-electric-green-700 active:border-electric-green-500
          "
        >
          CREATE
        </button>
      </form>
    </details>
  );
};

export default NewRoomForm;
