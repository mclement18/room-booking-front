import RoomsManagement from '@/components/RoomsManagement';
import TerminalWindow from '@/components/TerminalWindow';

export default function Rooms() {
  return (
    <main className="py-5">
      <div className="mb-10">
        <TerminalWindow
          paragraphs={[
            'You reached the Rooms page.',
            'Here you can see a list of rooms that you can book using their dedicated calendars.',
            'Each room has an associated color that will help you to distinguish them in the Events page overview.',
            'To book a room for an event, click on a date/time slot or select a time range on the room dedicated calendar.',
            'To see detailed information about an event and update or delete it, double click on the specific event.',
            'You can add and modify rooms at please. However, be responsible and do not screw everything up!',
            'The same applies to the booked slots.',
          ]}
        />
      </div>
      <RoomsManagement />
    </main>
  );
}
