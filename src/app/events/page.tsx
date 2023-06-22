import TerminalParagraph from '@/components/TerminalParagraph';
import TerminalWindow from '@/components/TerminalWindow';
import Link from 'next/link';

export default function Events() {
  return (
    <main className="py-5">
      <TerminalWindow
        paragraphs={[
          'Welcome to Emilie Room Booking App!',
          'On this page, you can see all events across all rooms.',
          'To book a room for an event, see events per room or update room information, please go to the Rooms page.',
        ]}
      />
    </main>
  );
}
