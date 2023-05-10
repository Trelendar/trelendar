import { EventType } from './../../share/type/calendar';
const now = new Date();


const events: EventType[] = [
  {
    _id: '0',
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 3, 0),
    end: new Date(2023, 3, 1),
  },
  {
    _id: '1',
    title: 'Long Event',
    start: new Date(2023, 3, 7),
    end: new Date(2023, 3, 10),
  },

  {
    _id: '2',
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    _id: '3',
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    _id: '4',
    title: 'Some Event',
    start: new Date(2023, 3, 9, 0, 0, 0),
    end: new Date(2023, 3, 10, 0, 0, 0),
  },
  {
    _id: '5',
    title: 'Conference',
    start: new Date(2023, 3, 11),
    end: new Date(2023, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    _id: '6',
    title: 'Meeting',
    start: new Date(2023, 3, 12, 10, 30, 0, 0),
    end: new Date(2023, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    _id: '7',
    title: 'Lunch',
    start: new Date(2023, 3, 12, 12, 0, 0, 0),
    end: new Date(2023, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    _id: '8',
    title: 'Meeting',
    start: new Date(2023, 3, 12, 14, 0, 0, 0),
    end: new Date(2023, 3, 12, 15, 0, 0, 0),
  },
  {
    _id: '9',
    title: 'Happy Hour',
    start: new Date(2023, 3, 12, 17, 0, 0, 0),
    end: new Date(2023, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    _id: '10',
    title: 'Dinner',
    start: new Date(2023, 3, 12, 20, 0, 0, 0),
    end: new Date(2023, 3, 12, 21, 0, 0, 0),
  },
  {
    _id: '11',
    title: 'Planning Meeting with Paige',
    start: new Date(2023, 3, 13, 8, 0, 0),
    end: new Date(2023, 3, 13, 10, 30, 0),
  },
  {
    _id: '11.1',
    title: 'Inconvenient Conference Call',
    start: new Date(2023, 3, 13, 9, 30, 0),
    end: new Date(2023, 3, 13, 12, 0, 0),
  },
  {
    _id: '11.2',
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2023, 3, 13, 11, 30, 0),
    end: new Date(2023, 3, 13, 14, 0, 0),
  },
  {
    _id: '11.3',
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2023, 3, 13, 15, 30, 0),
    end: new Date(2023, 3, 13, 16, 0, 0),
  },
  {
    _id: '12',
    title: 'Late Night Event',
    start: new Date(2023, 3, 17, 19, 30, 0),
    end: new Date(2023, 3, 18, 2, 0, 0),
  },
  {
    _id: '12.5',
    title: 'Late Same Night Event',
    start: new Date(2023, 3, 17, 19, 30, 0),
    end: new Date(2023, 3, 17, 23, 30, 0),
  },
  {
    _id: '13',
    title: 'Multi-day Event',
    start: new Date(2023, 3, 20, 19, 30, 0),
    end: new Date(2023, 3, 22, 2, 0, 0),
  },
  {
    _id: '14',
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    allDay: true,
  },
  {
    _id: '15',
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    _id: '16',
    title: 'V_ideo Record',
    start: new Date(2023, 3, 14, 15, 30, 0),
    end: new Date(2023, 3, 14, 19, 0, 0),
  },
  {
    _id: '17',
    title: 'Dutch Song Producing',
    start: new Date(2023, 3, 14, 16, 30, 0),
    end: new Date(2023, 3, 14, 20, 0, 0),
  },
  {
    _id: '18',
    title: 'Itaewon Halloween Meeting',
    start: new Date(2023, 3, 14, 16, 30, 0),
    end: new Date(2023, 3, 14, 17, 30, 0),
  },
  {
    _id: '19',
    title: 'Online Coding Test',
    start: new Date(2023, 3, 14, 17, 30, 0),
    end: new Date(2023, 3, 14, 20, 30, 0),
  },
  {
    _id: '20',
    title: 'An overlapped Event',
    start: new Date(2023, 3, 14, 17, 0, 0),
    end: new Date(2023, 3, 14, 18, 30, 0),
  },
  {
    _id: '21',
    title: 'Phone Interview',
    start: new Date(2023, 3, 14, 17, 0, 0),
    end: new Date(2023, 3, 14, 18, 30, 0),
  },
  {
    _id: '22',
    title: 'Cooking Class',
    start: new Date(2023, 3, 14, 17, 30, 0),
    end: new Date(2023, 3, 14, 19, 0, 0),
  },
  {
    _id: '23',
    title: 'Go to the gym',
    start: new Date(2023, 3, 14, 18, 30, 0),
    end: new Date(2023, 3, 14, 20, 0, 0),
  },
];

export default events;
