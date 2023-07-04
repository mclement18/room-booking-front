import EventsCalendar from '@/components/EventsCalendar';
import TerminalWindow from '@/components/TerminalWindow';

export default function Events() {
  return (
    <main className="py-5">
      <div className="mb-10">
        <TerminalWindow
          paragraphs={[
            'Welcome to Emilie Room Booking App!',
            'On this page, you can see all events across all rooms.',
            'To book a room for an event, click on a date/time slot or select a time range on the calendar.',
            'To see detailed information about an event and update or delete it, double click on the specific event.',
            'You can add and modify events at please. However, be civil and responsible and do not mess up with other poeple bookings!',
            'To see events per room and create, update or delete a room, please go to the Rooms page.',
          ]}
        />
      </div>
      <EventsCalendar />
    </main>
  );
}
