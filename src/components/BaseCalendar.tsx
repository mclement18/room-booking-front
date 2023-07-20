import React, { useState } from 'react';
import {
  Calendar,
  CalendarProps,
  EventPropGetter,
  SlotInfo,
  View,
  dateFnsLocalizer,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import RoomDto from '@/dtos/room_dto';
import EventDto from '@/dtos/event_dto';
import { BackendOptions, useBackendApi } from '@/utils/fetchers/fetch_back_api';
import EventModal, { ModalCloseReason } from './EventModal';
import clone from 'lodash/clone';
import EventModalProvider from './EventModalProvider';
import useEventModalContext from '@/hooks/useEventModalContext';
import { EventModalActionTypes } from '@/store/event_modal/actions';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type BaseCalendarProps = Omit<CalendarProps<EventDto, RoomDto>, 'localizer'> & {
  eventPath: string;
  room?: RoomDto;
};

const BaseCalendarInner = ({
  eventPath,
  room,
  ...calendarProps
}: BaseCalendarProps) => {
  const defaultFrom = new Date();
  defaultFrom.setDate(1);
  defaultFrom.setHours(0, 0, 0, 0);
  const defaultTo = new Date(
    defaultFrom.getFullYear(),
    defaultFrom.getMonth() + 1,
    0
  );
  defaultTo.setHours(23, 59, 59);

  const [dateRange, setDateRange] = useState<BackendOptions>({
    from: defaultFrom,
    to: defaultTo,
  });
  const { data: events, mutate } = useBackendApi<EventDto[]>(eventPath, {
    ...dateRange,
  });

  const { dispatch } = useEventModalContext();

  const onRangeChange = (
    range: Date[] | { start: Date; end: Date },
    _view?: View
  ) => {
    let from: Date, to: Date;
    if (Array.isArray(range)) {
      from = clone(range[0]);
      to = clone(range[range.length - 1]);
    } else {
      from = range.start;
      to = range.end;
    }
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 9999);
    setDateRange({ from, to });
  };

  const eventPropGetter: EventPropGetter<EventDto> = (
    event,
    _start,
    _end,
    _isSelected
  ) => {
    const color = event.room?.color || room?.color;
    return {
      className: color ? `event-${color}` : undefined,
    };
  };

  const onModalClose = (reason: ModalCloseReason) => {
    if (reason === 'success') {
      mutate();
    }
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end, resourceId } = slotInfo;
    dispatch({
      type: EventModalActionTypes.SET_CREATE,
      payload: { start, end, resourceId: (resourceId as number) || room?.id },
    });
  };

  const onDoubleClickEvent = (event: EventDto) => {
    const currentRoom = event.room || room;
    if (currentRoom) {
      const { name, start, end } = event;
      dispatch({
        type: EventModalActionTypes.SET_EDIT,
        payload: {
          name,
          start: new Date(start),
          end: new Date(end),
          resourceId: currentRoom.id,
          event: event,
        },
      });
    }
  };

  return (
    <>
      <div className="h-[600px]">
        <Calendar<EventDto, RoomDto>
          {...calendarProps}
          localizer={localizer}
          events={events}
          titleAccessor={(event) => event.name}
          tooltipAccessor={(event) => event.name}
          startAccessor={(event) => new Date(event.start)}
          endAccessor={(event) => new Date(event.end)}
          resourceAccessor={(event) => event.room?.id}
          resourceIdAccessor={(room) => room.id}
          resourceTitleAccessor={(room) => room.name}
          onRangeChange={onRangeChange}
          eventPropGetter={eventPropGetter}
          onSelectSlot={onSelectSlot}
          onDoubleClickEvent={onDoubleClickEvent}
          showMultiDayTimes
          popup
          selectable
        />
      </div>
      <EventModal onClose={onModalClose} />
    </>
  );
};

const BaseCalendar = (props: BaseCalendarProps) => (
  <EventModalProvider>
    <BaseCalendarInner {...props} />
  </EventModalProvider>
);

export default BaseCalendar;
