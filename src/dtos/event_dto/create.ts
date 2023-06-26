import type EventDto from '.';

type EventCreateDto = Omit<
  EventDto,
  'id' | 'createdAt' | 'updatedAt' | 'room'
> & {
  roomId: number;
};

export default EventCreateDto;
