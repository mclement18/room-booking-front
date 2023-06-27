import { useContext } from 'react';
import AlertContext from '@/constants/AlertContext';
import type { AlertContextType } from '@/constants/AlertContext';

export default function useAlertContext() {
  const alertContext = useContext<AlertContextType>(AlertContext);

  if (!alertContext) {
    throw new Error('No AlertContext provided when calling useAlertContext');
  }

  return alertContext;
}
