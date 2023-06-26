import type BaseDto from '../base_dto';
import type RoomDto from '../room_dto';

export default interface EventDto extends BaseDto {
  name: string;
  start: string;
  end: string;
  room?: RoomDto;
}
