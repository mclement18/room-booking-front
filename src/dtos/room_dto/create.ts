import type RoomDto from '.';

type RoomCreateDto = Omit<RoomDto, 'id' | 'createdAt' | 'updatedAt' | 'events'>;

export default RoomCreateDto;
