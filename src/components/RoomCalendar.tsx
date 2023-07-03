import React from 'react';
import BaseCalendar from './BaseCalendar';
import type RoomDto from '@/dtos/room_dto';

interface RoomCalendarProps {
  room: RoomDto;
}

const RoomCalendar = ({ room }: RoomCalendarProps) => {
  return (
    <>
      <BaseCalendar eventPath={`/room/${room.id}/event`} room={room} />
    </>
  );
};

export default RoomCalendar;
