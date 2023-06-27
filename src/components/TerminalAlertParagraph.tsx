import AlertMessageDto from '@/dtos/alert_message_dto';
import TerminalParagraph from './TerminalParagraph';
import { useMemo } from 'react';

interface TerminalAlertParagraphProps {
  alert: AlertMessageDto;
  skip?: boolean;
  onTerminated?: () => void;
}

const TerminalAlertParagraph = ({
  alert,
  skip,
  onTerminated,
}: TerminalAlertParagraphProps) => {
  const alertMessage = useMemo<string>(() => {
    const baseMessage = alert.title
      ? `${alert.title}: ${alert.message}`
      : alert.message;
    switch (alert.severity) {
      case 'success':
        return `✓ ${baseMessage}`;
      case 'failure':
        return `☠ ${baseMessage}`;
    }
  }, [alert.message, alert.severity, alert.title]);

  return (
    <TerminalParagraph
      text={alertMessage}
      skip={skip}
      onTerminated={onTerminated}
    />
  );
};

export default TerminalAlertParagraph;
