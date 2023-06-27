import { createContext } from 'react';
import type AlertService from '@/services/alert_service';
import type AlertMessageDto from '@/dtos/alert_message_dto';

export type AlertContextType =
  | {
      alertService: AlertService;
      alerts: AlertMessageDto[];
      removeAlert: (id: string) => void;
      clearAlerts: () => void;
    }
  | undefined;

const AlertContext = createContext<AlertContextType>(undefined);

export default AlertContext;
