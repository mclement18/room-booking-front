import EventDto from '@/dtos/event_dto';

type EventModalCreateState = {
  action: 'create';
  resourceId?: number;
};

type EventModalEditState = {
  action: 'edit';
  resourceId: number;
  event: EventDto;
};

export type EventModalState = (EventModalCreateState | EventModalEditState) & {
  open: boolean;
  name: string;
  start: Date;
  end: Date;
};

export const initialState: EventModalState = {
  open: false,
  action: 'create',
  name: '',
  start: new Date(),
  end: new Date(),
};
