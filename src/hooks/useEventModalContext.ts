import EventModalContext from '@/constants/EventModalContext';
import { useContext } from 'react';

export default function useEventModalContext() {
  const context = useContext(EventModalContext);

  if (context === null) {
    throw new Error(
      'EventModalContext is being accessed outside from its Provider'
    );
  }

  return context;
}
