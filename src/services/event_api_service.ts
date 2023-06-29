import { BaseApiService } from './base_api_service';
import type { ExtendedApiServiceArgs } from './base_api_service';
import type { AbstractApiService } from './abstract_api_service';
import type EventDto from '@/dtos/event_dto';
import type EventCreateDto from '@/dtos/event_dto/create';
import type EventEditDto from '@/dtos/event_dto/edit';

export class EventApiService
  extends BaseApiService
  implements AbstractApiService<EventDto>
{
  constructor({ apiUrl, alertService }: ExtendedApiServiceArgs) {
    super({
      basePath: '/Event',
      serviceName: 'Event Api Service',
      apiUrl,
      alertService,
    });
  }

  public async create(dto: EventCreateDto): Promise<EventDto | undefined> {
    try {
      const response = await this.fetchApi<EventDto>({
        init: { method: 'POST', body: JSON.stringify(dto) },
      });
      this.showSuccess(`Event "${response.name}" created successfully!`);
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
    dto: EventEditDto
  ): Promise<EventDto | undefined> {
    try {
      const response = await this.fetchApi<EventDto>({
        path: id.toString(),
        init: { method: 'PATCH', body: JSON.stringify(dto) },
      });
      this.showSuccess(`Event updated successfully!`);
      return response;
    } catch (error) {
      this.showErrorWithMessage(
        'An error occured during event update...',
        error as Error
      );
      console.error(error);
    }
  }

  public async delete(id: number): Promise<EventDto | undefined> {
    try {
      const response = await this.fetchApi<EventDto>({
        path: id.toString(),
        init: { method: 'DELETE' },
      });
      this.showSuccess(`Event deleted successfully!`);
      return response;
    } catch (error) {
      this.showErrorWithMessage(
        'An error occured during event deletion...',
        error as Error
      );
      console.error(error);
    }
  }
}
