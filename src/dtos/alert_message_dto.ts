type AlertMessageDto = {
  id: string;
  severity: 'success' | 'failure';
  message: string;
  title?: string;
};

export default AlertMessageDto;
