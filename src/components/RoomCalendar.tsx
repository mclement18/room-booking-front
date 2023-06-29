import RoomDto from '@/dtos/room_dto';
import React from 'react';
import BaseCalendar from './BaseCalendar';

interface RoomCalendarProps {
  room: RoomDto;
}

const RoomCalendar = ({ room }: RoomCalendarProps) => {
  return (
    <BaseCalendar eventPath={`/room/${room.id}/event`} roomColor={room.color} />
  );
};

export default RoomCalendar;
