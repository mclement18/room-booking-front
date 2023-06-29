import type RoomDto from '@/dtos/room_dto';
import { MouseEventHandler, useEffect, useState } from 'react';
import TextField from './TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Color } from '@/constants/colors';
import useValidateRoomNameUniqueness from '@/hooks/validators/useValidateRoomNameUniqueness';
import { useApiService } from '@/hooks/useApiService';
import { RoomApiService } from '@/services/room_api_service';
import { KeyedMutator } from 'swr';
import useAlertContext from '@/hooks/useAlertContext';
import ColorPicker from './ColorPicker';
import updateOrUndefined from '@/utils/updateOrUndefined';
import Button from './Button';
import ColorSwatch from './ColorSwatch';
import RoomCalendar from './RoomCalendar';
import AnimatedDetails from './AnimatedDetails';

interface RoomEditFormInputs {
  name: string;
  color: Color;
}

interface RoomDisplayProps {
  room: RoomDto;
  mutateRooms: KeyedMutator<RoomDto[]>;
}

const RoomDisplay = ({ room, mutateRooms }: RoomDisplayProps) => {
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isDirty },
  } = useForm<RoomEditFormInputs>({
    defaultValues: { name: room.name, color: room.color },
    shouldFocusError: true,
  });

  const validatteRoomNameUniqueness = useValidateRoomNameUniqueness(room.name);

  const { alertService } = useAlertContext();

  const roomApiService = useApiService(RoomApiService);

  const onSubmit: SubmitHandler<RoomEditFormInputs> = async ({
    name,
    color,
  }) => {
    const response = await roomApiService.update(room.id, {
      name: updateOrUndefined(room.name, name),
      color: updateOrUndefined(room.color, color),
    });
    if (response) {
      setEdit(false);
      mutateRooms();
    } else {
      setFocus('name');
    }
  };

  useEffect(() => {
    if (errors.name) {
      alertService.sendAlert({
        severity: 'failure',
        title: 'Room Update Error',
        message: errors.name.message || 'unknow error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.name]);

  const onDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    const response = await roomApiService.delete(room.id);
    if (response) {
      mutateRooms();
    }
  };

  const onEdit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setEdit(true);
  };

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setEdit(false);
    reset();
  };

  return (
    <AnimatedDetails
      openedMaxHeightClass="open:max-h-[800px]"
      className="max-h-[49.5px] open:max-h-[800px] duration-500"
      summaryProps={{
        className: 'text-xl',
        children: (
          <>
            {edit ? (
              <form
                className="inline-flex text-lg"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mr-3">
                  <TextField
                    label="Name"
                    {...register('name', {
                      required: 'Room name is required!',
                      validate: { uniqueness: validatteRoomNameUniqueness },
                    })}
                  />
                </div>
                <div className="mr-3">
                  <ColorPicker
                    label="Color"
                    {...register('color')}
                    value={room.color}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={(event) => event.stopPropagation()}
                  className="mr-3 text-sm self-center"
                  disabled={!isDirty}
                >
                  UPDATE
                </Button>
                <Button
                  type="button"
                  onClick={onCancel}
                  className="mr-3 text-sm self-center"
                >
                  CANCEL
                </Button>
              </form>
            ) : (
              <div className="inline-flex">
                <h3 className="mr-3">{room.name}</h3>
                <ColorSwatch
                  color={room.color}
                  title={room.color}
                  className="mr-3"
                />
                <Button
                  type="button"
                  onClick={onEdit}
                  className="mr-3 text-sm self-center"
                >
                  EDIT
                </Button>
                <Button
                  type="button"
                  onClick={onDelete}
                  className="mr-3 text-sm self-center"
                >
                  DELETE
                </Button>
              </div>
            )}
          </>
        ),
      }}
    >
      <RoomCalendar room={room} />
    </AnimatedDetails>
  );
};

export default RoomDisplay;
