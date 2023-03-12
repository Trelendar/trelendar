import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './mockEvent';
import { EventType } from '../../share/type/calendar';
import { useHydrationSafeDate } from '../../share/hooks/use-hydration-safe-date';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [eventsData, setEventsData] = useState<EventType[]>(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt('New Event name');
    if (!title) return;
    const newEvent: EventType = {
      id: 'not yet update',
      start: start,
      end: end,
      title: title,
    };
    setEventsData([...eventsData, newEvent]);
  };
  return (
    <div className="App">
      <Calendar
        views={['day', 'week', 'month', 'agenda']}
        selectable
        localizer={localizer}
        // @ts-ignore
        // defaultDate={new Date()}
        defaultView="agenda"
        events={eventsData}
        style={{ height: '90vh' }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default Scheduler;
