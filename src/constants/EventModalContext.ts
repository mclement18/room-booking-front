import { EventModalAction } from '@/store/event_modal/actions';
import { EventModalState } from '@/store/event_modal/state';
import { Dispatch, createContext } from 'react';

export type EventModalContextType = {
  state: EventModalState;
  dispatch: Dispatch<EventModalAction>;
};

const EventModalContext = createContext<EventModalContextType | null>(null);

export default EventModalContext;
