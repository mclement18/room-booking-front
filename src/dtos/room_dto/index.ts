import type { Color } from '@/constants/colors';
import type BaseDto from '../base_dto';
import type EventDto from '../event_dto';

export default interface RoomDto extends BaseDto {
  name: string;
  color: Color;
  events?: EventDto[];
}
