import React, { PropsWithChildren, useReducer } from 'react';
import EventModalContext from '@/constants/EventModalContext';
import { reducer } from '@/store/event_modal/reducer';
import { initialState } from '@/store/event_modal/state';

const EventModalProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EventModalContext.Provider value={{ state, dispatch }}>
      {children}
    </EventModalContext.Provider>
  );
};

export default EventModalProvider;
