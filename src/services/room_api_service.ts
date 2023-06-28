import { BaseApiService } from './base_api_service';
import type { ExtendedApiServiceArgs } from './base_api_service';
import type { AbstractApiService } from './abstract_api_service';
import type RoomDto from '@/dtos/room_dto';
import type RoomCreateDto from '@/dtos/room_dto/create';
import type RoomEditDto from '@/dtos/room_dto/edit';

export class RoomApiService
  extends BaseApiService
  implements AbstractApiService<RoomDto>
{
  constructor({ apiUrl, alertService }: ExtendedApiServiceArgs) {
    super({
      basePath: '/room',
      serviceName: 'Room Api Service',
      apiUrl,
      alertService,
    });
  }

  public async create(dto: RoomCreateDto): Promise<RoomDto | undefined> {
    try {
      const response = await this.fetchApi<RoomDto>({
        init: { method: 'POST', body: JSON.stringify(dto) },
      });
      this.showSuccess(`Room "${response.name}" created successfully!`);
      return response;
    } catch (error) {
      this.showErrorWithMessage(
        'An error occured during event creation...',
        error as Error
      );
      console.error(error);
    }
  }

  public async update(
    id: number,
    dto: RoomEditDto
  ): Promise<RoomDto | undefined> {
    try {
      const response = await this.fetchApi<RoomDto>({
        path: id.toString(),
        init: { method: 'PATCH', body: JSON.stringify(dto) },
      });
      this.showSuccess(`Room "${response.name}" created successfully!`);
      return response;
    } catch (error) {
      this.showErrorWithMessage(
        'An error occured during event creation...',
        error as Error
      );
      console.error(error);
    }
  }

  public async delete(id: number): Promise<RoomDto | undefined> {
    try {
      const response = await this.fetchApi<RoomDto>({
        path: id.toString(),
        init: { method: 'DELETE' },
      });
      this.showSuccess(`Room "${response.name}" created successfully!`);
      return response;
    } catch (error) {
      this.showErrorWithMessage(
        'An error occured during event creation...',
        error as Error
      );
      console.error(error);
    }
  }
}
