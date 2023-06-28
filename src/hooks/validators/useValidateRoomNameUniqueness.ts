import type { Validate } from 'react-hook-form';
import type RoomDto from '@/dtos/room_dto';
import { fetchJSON } from '@/utils/fetchers/fetch';
import { useApiUrl } from '@/utils/fetchers/fetch_next';
import joinUrl from '@/utils/joinUrl';

export default function useValidateRoomNameUniqueness(
  previuosValue?: string
): Validate<string, unknown> {
  const apiUrl = useApiUrl();

  return async (value) => {
    if (previuosValue === value) return true;

    if (apiUrl === undefined) return 'Unable to get backend URL';

    try {
      const rooms = await fetchJSON<RoomDto[]>(joinUrl(apiUrl, '/room'));
      if (rooms.find((room) => room.name === value)) {
        return 'Room name is already used!';
      }
      return true;
    } catch (error) {
      return 'Could not verify room name uniqueness...';
    }
  };
}
