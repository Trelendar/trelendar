import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
import events from './mockEvent';
import { EventType } from '../../share/type/calendar';
import moment from 'moment-timezone';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [eventsData, setEventsData] = useState<EventType[]>(events);
  const [isShowNewEvent, setIsShowNewEvent] = useState<Boolean>(false);
  const [titleNewEvent, setTitleNewEvent] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const onInputTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = evt.target.value;
    setTitleNewEvent(newTitle);
  };

  const onSaveChanges = () => {
    if (!titleNewEvent) return;
    setIsShowNewEvent(true);
    const newEvent: EventType = {
      id: 'not yet update',
      start: startTime,
      end: endTime,
      title: titleNewEvent,
    };
    setEventsData([...eventsData, newEvent]);
    setIsShowNewEvent(false);
  }

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    setEndTime(end);
    setStartTime(start);
    setIsShowNewEvent(true);
  };

    useEffect(() => {
      const isInputAdded = inputTitleRef && inputTitleRef.current;
      if (isInputAdded) {
        inputTitleRef.current.focus();
      }
    }, [isShowNewEvent]);
  return (
    <>
      <div className="p-3">
        <Calendar
          views={['day', 'week', 'month', 'agenda']}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={eventsData}
          style={{ height: '88vh' }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
        />
        {isShowNewEvent ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[550px] my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-[#919bab]">New Event</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsShowNewEvent(false)}
                    ></button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <span className="my-4 text-slate-500 text-lg leading-relaxed">
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Event title
                        </label>
                        <input
                          ref={inputTitleRef}
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(evt) => onInputTitle(evt)}
                          onKeyDown={(e) => e.key === 'Escape' && setIsShowNewEvent(false)}
                        />
                      </div>
                    </span>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsShowNewEvent(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-[#BCB4D8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={onSaveChanges}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Scheduler;
