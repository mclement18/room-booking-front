import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import React from 'react';
import TextField from './TextField';
import Button from './Button';
import DateTimePicker from 'react-datetime-picker';
import EventDto from '@/dtos/event_dto';
import { useBackendApi } from '@/utils/fetchers/fetch_back_api';
import RoomDto from '@/dtos/room_dto';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useApiService } from '@/hooks/useApiService';
import { EventApiService } from '@/services/event_api_service';
import updateOrUndefined from '@/utils/updateOrUndefined';
import SelectInput, { SelectOption } from './SelectInput';
import useEventModalContext from '@/hooks/useEventModalContext';
import { EventModalActionTypes } from '@/store/event_modal/actions';
import { isEqual } from 'lodash';

type EventFormInputs = {
  name: string;
  start: Date;
  end: Date;
  room: RoomDto | undefined;
};

export type ModalCloseReason = 'success' | 'cancel' | 'error';

export type EventModalProps = {
  onClose: (reason: ModalCloseReason) => void;
};

const EventModal = ({ onClose }: EventModalProps) => {
  const { state, dispatch } = useEventModalContext();

  const { open, action, name, start, end, resourceId } = state;

  const onOpenChange = (open: boolean) =>
    dispatch({ type: EventModalActionTypes.SET_OPEN, payload: { open } });

  const closeModal = () => onOpenChange(false);

  const { data: rooms } = useBackendApi<RoomDto[]>('/room');

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
  });

  const { isMounted, styles } = useTransitionStyles(context);

  const { control, handleSubmit } = useForm<EventFormInputs>({
    values: {
      name,
      start,
      end,
      room: rooms?.find((room) => room.id === resourceId),
    },
    shouldFocusError: true,
  });

  const disableRoomSelection = !(
    action === 'create' && resourceId === undefined
  );

  const eventApiService = useApiService(EventApiService);

  const onSubmit: SubmitHandler<EventFormInputs> = async ({
    name,
    start,
    end,
    room,
  }) => {
    if (room === undefined) return;

    let response: EventDto | Partial<EventDto> | undefined;
    if (action === 'create') {
      response = await eventApiService.create({
        name,
        start: start.toJSON(),
        end: end.toJSON(),
        roomId: room.id,
      });
    } else {
      const event = state.event;
      const dateChanged =
        !isEqual(event.start, start.toJSON()) ||
        !isEqual(event.end, end.toJSON());
      response = await eventApiService.update(event.id, {
        name: updateOrUndefined(event.name, name),
        start: dateChanged ? start.toJSON() : undefined,
        end: dateChanged ? end.toJSON() : undefined,
        roomId: updateOrUndefined(event.room?.id, room.id),
      });
    }

    if (response) {
      onClose('success');
    } else {
      onClose('error');
    }
    closeModal();
  };

  const onDelete = async () => {
    if (action === 'edit') {
      const response = await eventApiService.delete(state.event.id);
      if (response) {
        onClose('success');
      } else {
        onClose('error');
      }
      closeModal();
    }
  };

  const onCancel = () => {
    onClose('cancel');
    closeModal();
  };

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll className="z-50">
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={{
              ...styles,
              ...floatingStyles,
            }}
            className="w-full h-full backdrop-blur-md relative"
          >
            <div
              className="
                bg-black bg-gradient-radial from-electric-green-900 from-150% to-transparent to-75%
                border border-electric-green-700 rounded-md
                shadow-lg shadow-electric-green-900
                min-w-[600px] min-h-[300px]
                absolute inset-1/2 -translate-x-1/2 -translate-y-1/2
              "
            >
              <div className="p-5 h-full flex flex-col">
                <div className="mb-6">
                  <h1 className="text-2xl">
                    {action === 'create' && 'New '}Event
                  </h1>
                  <p>
                    Book a time window by putting your name and optional
                    additional info in <span className="underline">Name</span>.
                  </p>
                </div>
                <form
                  className="flex-grow flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-4/5 mx-auto mb-6">
                    <div className="mb-4">
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: 'Event name is required!',
                        }}
                        render={({ field }) => (
                          <TextField
                            label="Name"
                            {...field}
                            onChange={(e) =>
                              dispatch({
                                type: EventModalActionTypes.SET_NAME,
                                payload: { name: e.currentTarget.value },
                              })
                            }
                            className="w-full"
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-between mb-4">
                      <fieldset>
                        <label className="mr-2 text-electric-green-300">
                          Start:
                        </label>
                        <Controller
                          name="start"
                          control={control}
                          render={({ field: { ref, ...rest } }) => (
                            <DateTimePicker
                              inputRef={ref}
                              {...rest}
                              onChange={(value) => {
                                if (value !== null) {
                                  dispatch({
                                    type: EventModalActionTypes.SET_START,
                                    payload: { start: value },
                                  });
                                }
                              }}
                              format="dd/MM/yyyy HH:mm"
                              clearIcon={null}
                              disableClock
                            />
                          )}
                        />
                      </fieldset>
                      <fieldset>
                        <label className="mr-2 text-electric-green-300">
                          End:
                        </label>
                        <Controller
                          name="end"
                          control={control}
                          render={({ field: { ref, ...rest } }) => (
                            <DateTimePicker
                              inputRef={ref}
                              {...rest}
                              onChange={(value) => {
                                if (value !== null) {
                                  dispatch({
                                    type: EventModalActionTypes.SET_END,
                                    payload: { end: value },
                                  });
                                }
                              }}
                              format="dd/MM/yyyy HH:mm"
                              clearIcon={null}
                              disableClock
                            />
                          )}
                        />
                      </fieldset>
                    </div>
                    <Controller
                      name="room"
                      control={control}
                      rules={{
                        required: 'Room is required!',
                      }}
                      render={({ field }) => (
                        <SelectInput<RoomDto>
                          label="Room"
                          {...field}
                          onChange={(value) =>
                            dispatch({
                              type: EventModalActionTypes.SET_RESOURCE_ID,
                              payload: { resourceId: value.id },
                            })
                          }
                          nameGetter={(room) => room.name}
                          disabled={disableRoomSelection}
                          fullWidth
                        >
                          {rooms?.map((room) => (
                            <SelectOption<RoomDto>
                              key={room.id.toString()}
                              option={room}
                            />
                          ))}
                        </SelectInput>
                      )}
                    />
                  </div>
                  <div className="flex mt-auto">
                    <Button type="submit" className="mr-auto">
                      {action.toUpperCase()}
                    </Button>
                    <Button type="button" onClick={onCancel}>
                      CANCEL
                    </Button>
                    {action === 'edit' && (
                      <Button type="button" className="ml-2" onClick={onDelete}>
                        DELETE
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export default EventModal;
