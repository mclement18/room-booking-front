import type RoomDto from '@/dtos/room_dto';
import { useEffect, useState } from 'react';
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

  const onDelete = async () => {
    const response = await roomApiService.delete(room.id);
    if (response) {
      mutateRooms();
    }
  };

  const onEdit = () => setEdit(true);

  const onCancel = () => {
    setEdit(false);
    reset();
  };

  return (
    <details>
      <summary className="w-max mb-5 text-xl cursor-pointer">
        {edit ? (
          <form
            className="inline-flex text-lg"
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
      </summary>
      <RoomCalendar room={room} />
    </details>
  );
};

export default RoomDisplay;
