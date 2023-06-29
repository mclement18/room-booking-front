'use client';
import React from 'react';
import BaseCalendar from './BaseCalendar';
import { useBackendApi } from '@/utils/fetchers/fetch_back_api';
import RoomDto from '@/dtos/room_dto';

const EventsCalendar = () => {
  const { data: rooms } = useBackendApi<RoomDto[]>('/room');
  return (
    <BaseCalendar
      eventPath="/event"
      resources={rooms}
      views={['month', 'day']}
    />
  );
};

export default EventsCalendar;
