'use client';
import React from 'react';
import { useBackendApi } from '@/utils/fetchers/fetch_back_api';
import NewRoomForm from './NewRoomForm';
import type RoomDto from '@/dtos/room_dto';
import RoomDisplay from './RoomDisplay';

const RoomsManagement = () => {
  const { data: rooms, mutate } = useBackendApi<RoomDto[]>('/room');

  return (
    <div>
      {/* new room form */}
      <div className="mb-5">
        <NewRoomForm mutateRooms={mutate} />
      </div>
      {/* roomlist */}
      <section>
        <h2 className="text-2xl mb-5">Rooms</h2>
        <div>
          {/* room dropdown with calendar */}
          {rooms?.map((room) => (
            <div key={room.id.toString()} className="mb-5">
              <RoomDisplay room={room} mutateRooms={mutate} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoomsManagement;
