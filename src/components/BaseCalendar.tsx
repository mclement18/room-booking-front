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
import EventModal, { EventFormProps, ModalCloseReason } from './EventModal';
import clone from 'lodash/clone';

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

const BaseCalendar = ({
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

  const [isOpen, setIsOpen] = useState(false);

  const [eventModalProps, setEventModalProps] = useState<EventFormProps>({
    action: 'create',
    name: '',
    start: new Date(),
    end: new Date(),
    resourceId: 0,
  });

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
    setIsOpen(false);
    if (reason === 'success') {
      mutate();
    }
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end, resourceId } = slotInfo;
    setEventModalProps({
      action: 'create',
      name: '',
      start,
      end,
      resourceId: (resourceId as number) || room?.id,
    });
    setIsOpen(true);
  };

  const onDoubleClickEvent = (event: EventDto) => {
    const currentRoom = event.room || room;
    if (currentRoom) {
      setEventModalProps({
        action: 'edit',
        event: {
          ...event,
          room: currentRoom,
        },
      });
      setIsOpen(true);
    }
  };

  return (
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
      <EventModal
        {...eventModalProps}
        onClose={onModalClose}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
};

export default BaseCalendar;
