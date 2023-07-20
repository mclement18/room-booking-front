import EventDto from '@/dtos/event_dto';

export enum EventModalActionTypes {
  SET_OPEN = 'SET_OPEN',
  SET_NAME = 'SET_NAME',
  SET_START = 'SET_START',
  SET_END = 'SET_END',
  SET_RESOURCE_ID = 'SET_RESOURCE_ID',
  SET_CREATE = 'SET_CREATE',
  SET_EDIT = 'SET_EDIT',
  RESET = 'RESET',
}

export type SetOpenAction = {
  type: EventModalActionTypes.SET_OPEN;
  payload: { open: boolean };
};

export type SetNameAction = {
  type: EventModalActionTypes.SET_NAME;
  payload: { name: string };
};

export type SetStartAction = {
  type: EventModalActionTypes.SET_START;
  payload: { start: Date };
};

export type SetEndAction = {
  type: EventModalActionTypes.SET_END;
  payload: { end: Date };
};

export type SetResourceIdAction = {
  type: EventModalActionTypes.SET_RESOURCE_ID;
  payload: { resourceId?: number };
};

export type SetCreateAction = {
  type: EventModalActionTypes.SET_CREATE;
  payload: { start: Date; end: Date; resourceId?: number };
};

export type SetEditAction = {
  type: EventModalActionTypes.SET_EDIT;
  payload: {
    name: string;
    start: Date;
    end: Date;
    resourceId: number;
    event: EventDto;
  };
};

export type ResetAction = {
  type: EventModalActionTypes.RESET;
};

export type EventModalAction =
  | SetOpenAction
  | SetNameAction
  | SetStartAction
  | SetEndAction
  | SetResourceIdAction
  | SetCreateAction
  | SetEditAction
  | ResetAction;
