import React from 'react';
import { EventType } from '../../share/type/calendar';
import { MdEventNote } from 'react-icons/md';
import { date } from 'yup/lib/locale';

const DetailEvent = () => {
  const detailEvent: EventType = {
    id: '1',
    start: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
    allDay: false,
    title: 'New Event',
    desc: 'This is new Event',
  };
	//@ts-ignore
	const startEvent = new Date(detailEvent.start);
	const endEvent = new Date(detailEvent.end);

  return (
    <div className="p-2">
      <div className="flex">
        <MdEventNote className="text-3xl text-colorHome inline-block  mt-3" />
        <div className="text-[2rem] font-medium inline-block">{detailEvent.title}</div>
      </div>
      <div>
        {startEvent.getDate() + '/' + startEvent.getMonth() + '/' + startEvent.getFullYear()}
      </div>
      <div>{endEvent.getDate() + '/' + endEvent.getMonth() + '/' + endEvent.getFullYear()}</div>
      <div>Start Time: {startEvent.getHours() + ':' + startEvent.getMinutes()}</div>
      <div>End Time: {endEvent.getHours() + ':' + endEvent.getMinutes()}</div>
    </div>
  );
};

export default DetailEvent;
