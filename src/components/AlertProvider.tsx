'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import AlertContext from '@/constants/AlertContext';
import AlertService from '@/services/alert_service';
import type AlertMessageDto from '@/dtos/alert_message_dto';
import { usePathname } from 'next/navigation';

type AlertProviderProps = PropsWithChildren;

const AlertProvider = ({ children }: AlertProviderProps) => {
  const pathname = usePathname();
  const [alerts, setAlerts] = useState<AlertMessageDto[]>([]);
  const alertService = new AlertService({
    next: (alert) => setAlerts((state) => [...state, alert]),
    error: (err) => console.error('Error in sending Alert', err),
    complete: () => setAlerts([]),
  });

  const removeAlert = (id: string) =>
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));

  const clearAlerts = () => setAlerts([]);

  useEffect(() => {
    clearAlerts();
  }, [pathname]);

  return (
    <AlertContext.Provider
      value={{ alertService, alerts, removeAlert, clearAlerts }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
