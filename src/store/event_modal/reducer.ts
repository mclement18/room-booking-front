import { EventModalAction, EventModalActionTypes } from './actions';
import { EventModalState, initialState } from './state';

export function reducer(
  state: EventModalState,
  action: EventModalAction
): EventModalState {
  switch (action.type) {
    case EventModalActionTypes.SET_OPEN:
      return {
        ...state,
        open: action.payload.open,
      };
    case EventModalActionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case EventModalActionTypes.SET_START:
      return {
        ...state,
        start: action.payload.start,
      };
    case EventModalActionTypes.SET_END:
      return {
        ...state,
        end: action.payload.end,
      };
    case EventModalActionTypes.SET_RESOURCE_ID:
      return {
        ...state,
        resourceId: action.payload.resourceId as number,
      };
    case EventModalActionTypes.SET_CREATE:
      return {
        open: true,
        action: 'create',
        name: '',
        ...action.payload,
      };
    case EventModalActionTypes.SET_EDIT:
      return {
        open: true,
        action: 'edit',
        ...action.payload,
      };
    case EventModalActionTypes.RESET:
      return initialState;
  }
}
