import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
import { EventType } from '../../share/type/calendar';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import axios from '../../lib/axios';
import { IUser } from '../../models/userModel';

// moment.locale('en-GB');
moment.tz.setDefault('Asia/Vietnam');
const localizer = momentLocalizer(moment);

const DEFAULT_VALUE_USER_SELECTED = '0';

const Scheduler = () => {
  const [eventsData, setEventsData] = useState<EventType[]>([]);
  const [isShowNewEvent, setIsShowNewEvent] = useState<Boolean>(false);
  const [isAllday, setIsAllday] = useState<boolean>(false);
  const [titleNewEvent, setTitleNewEvent] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<string>(DEFAULT_VALUE_USER_SELECTED);

  const router = useRouter();

  const onInputTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = evt.target.value;
    setTitleNewEvent(newTitle);
  };

  const onSaveChanges = async () => {
    if (!titleNewEvent) return;
    setIsShowNewEvent(true);
    const newEvent: EventType = {
      _id: 'not_yet_update',
      start: startTime,
      end: endTime,
      title: titleNewEvent,
      allDay: isAllday,
      desc: '',
    };
    axios
      .post('/calendar', {
        ...newEvent,
      })
      .then(() => {
        setEventsData([...eventsData, newEvent]);
        setIsAllday(false);
        setIsShowNewEvent(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (start: Date, end: Date) => {
    console.log(start);
    console.log(end);
    setEndTime(end);
    setStartTime(start);
    setIsShowNewEvent(true);
  };

  const onClickEvent = (event: EventType) => {
    router.push(`calendar/${event._id}`);
  };

  useEffect(() => {
    const isInputAdded = inputTitleRef && inputTitleRef.current;
    if (isInputAdded) {
      inputTitleRef.current.focus();
    }
  }, [isShowNewEvent]);

  useEffect(() => {
    axios
      .get(`/calendar/user`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const path = userSelected === DEFAULT_VALUE_USER_SELECTED? '': userSelected;
    axios
      .get(`/calendar/${path}`)
      .then((res) => {
        if (res.data.length === 0) return;
        const convertStiringToDate = res.data.map((item: EventType) => {
          return {
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
          };
        });
        setEventsData(convertStiringToDate);
      })
      .catch((err) => console.log(err));
  }, [userSelected]);

  return (
    <>
      <div className="p-3">
        <div className="mb-9 border p-2 border-[#5B5393] rounded shadow">
          <Box sx={{ minWidth: 50 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Select member
              </InputLabel>
              <NativeSelect
                value={userSelected}
                onChange={(e) => setUserSelected(e.target.value)}
                inputProps={{
                  name: 'member',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={DEFAULT_VALUE_USER_SELECTED}>Logged User</option>
                {userList.map((user) => (
                  <option value={user._id} key={user._id}>{user.name}</option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>
        </div>

        <Calendar
          views={['day', 'week', 'month', 'agenda']}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={eventsData}
          style={{ height: '75vh' }}
          onSelectEvent={(event) => onClickEvent(event)}
          onSelectSlot={({ start, end }) => handleSelect(start, end)}
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
                  <div className="ml-6">
                    <div>
                      Datetime:{'  '}
                      <span className="font-bold text-colorHome">
                        {startTime.toLocaleTimeString('en-US', {
                          hour12: false,
                          hour: 'numeric',
                          minute: 'numeric',
                        })}{' '}
                        -{' '}
                        {endTime.toLocaleTimeString('en-GB', {
                          hour12: false,
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </span>{' '}
                      <span className="italic">({startTime.toLocaleDateString()})</span>
                    </div>
                    All Day:
                    <Checkbox
                      color="secondary"
                      size="medium"
                      checked={isAllday}
                      onChange={() => setIsAllday(!isAllday)}
                    />
                  </div>
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
