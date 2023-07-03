import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import React, { useCallback, useEffect } from 'react';
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

type EventFormInputs = {
  name: string;
  start: Date;
  end: Date;
  room: RoomDto;
};

export type ModalCloseReason = 'success' | 'cancel' | 'error';

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean, event?: Event) => void;
  onClose: (reason: ModalCloseReason) => void;
};

type CreateProps = {
  action: 'create';
  name: string;
  start: Date;
  end: Date;
  resourceId?: number;
};

type EditProps = {
  action: 'edit';
  event: EventDto & { room: RoomDto };
};

export type EventFormProps = CreateProps | EditProps;

export type EventModalProps = EventFormProps & ModalProps;

const EventModal = (props: EventModalProps) => {
  const { data: rooms } = useBackendApi<RoomDto[]>('/room');

  const { refs, floatingStyles, context } = useFloating({
    open: props.open,
    onOpenChange: props.onOpenChange,
  });

  const { isMounted, styles } = useTransitionStyles(context);

  const setDefaultValues = useCallback(
    () =>
      props.action === 'create'
        ? {
            name: props.name,
            start: props.start,
            end: props.end,
            room: rooms?.find(
              (room) => room.id === props.resourceId
            ) as RoomDto,
          }
        : {
            name: props.event.name,
            start: new Date(props.event.start),
            end: new Date(props.event.end),
            room: props.event.room,
          },
    [props, rooms]
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<EventFormInputs>({
    defaultValues: setDefaultValues(),
    shouldFocusError: true,
  });

  useEffect(() => {
    reset(setDefaultValues());
  }, [reset, setDefaultValues]);

  const disableRoomSelection = !(
    props.action === 'create' && props.resourceId === undefined
  );

  const eventApiService = useApiService(EventApiService);

  const onSubmit: SubmitHandler<EventFormInputs> = async ({
    name,
    start,
    end,
    room,
  }) => {
    let response: EventDto | Partial<EventDto> | undefined;
    if (props.action === 'create') {
      response = await eventApiService.create({
        name,
        start: start.toJSON(),
        end: end.toJSON(),
        roomId: room.id,
      });
    } else {
      const { event } = props;
      response = await eventApiService.update(event.id, {
        name: updateOrUndefined(event.name, name),
        start: updateOrUndefined(event.start, start.toJSON()),
        end: updateOrUndefined(event.end, end.toJSON()),
        roomId: updateOrUndefined(event.room?.id, room.id),
      });
    }

    if (response) {
      props.onClose('success');
    } else {
      props.onClose('error');
    }
  };

  const onDelete = async () => {
    if (props.action === 'edit') {
      const response = await eventApiService.delete(props.event.id);
      if (response) {
        props.onClose('success');
      } else {
        props.onClose('error');
      }
    }
  };

  const onCancel = () => props.onClose('cancel');

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
                    {props.action === 'create' && 'New '}Event
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
                      <TextField
                        label="Name"
                        {...register('name', {
                          required: 'Event name is required!',
                        })}
                        className="w-full"
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
                          render={({ field: { ref, onChange, ...rest } }) => (
                            <DateTimePicker
                              inputRef={ref}
                              {...rest}
                              onChange={(value) => {
                                if (value !== null) {
                                  onChange(value);
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
                          render={({ field: { ref, onChange, ...rest } }) => (
                            <DateTimePicker
                              inputRef={ref}
                              {...rest}
                              onChange={(value) => {
                                if (value !== null) {
                                  onChange(value);
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
                      render={({ field }) => (
                        <SelectInput<RoomDto>
                          label="Room"
                          {...field}
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
                    <Button
                      type="submit"
                      className="mr-auto"
                      disabled={!isDirty}
                    >
                      {props.action.toUpperCase()}
                    </Button>
                    <Button type="button" onClick={onCancel}>
                      CANCEL
                    </Button>
                    {props.action === 'edit' && (
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
