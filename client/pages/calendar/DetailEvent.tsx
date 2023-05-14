import React, { useEffect, useState } from 'react';
import { EventType } from '../../share/type/calendar';
import { MdEventNote } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdAllInclusive } from 'react-icons/md';
import { MdSettingsBackupRestore } from 'react-icons/md';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Tag } from '../../share/type/kanban';
import { WithContext as ReactTags } from 'react-tag-input';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const DetailEvent: React.FC = () => {
  const router = useRouter();
  const { slug: eventId } = router.query;

  const [detailEvent, setDetailEvent] = useState<EventType>({
    _id: '',
    start: '',
    end: '',
    title: '',
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [usersSuggest, setUsersSuggest] = useState<Tag[]>([]);
  const addUserInEvent = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const deleteUserInEvent = (tag: Tag) => {};

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [startTimePicker, setStartTimePicker] = useState<Dayjs>(dayjs(new Date()));
  const [endTimePicker, setEndTimePicker] = useState<Dayjs>(dayjs(new Date()));
  const [desEvent, setDesEvent] = useState<string>('None');
  const [titleEdit, setTitleEdit] = useState<string>('');
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeFormat = (stringInput: string) => {}; // using to change fomat of date()

  const handleSave = () => {
    setIsLoading(true);

    const memers = tags.map((tag) => tag.id);
    const updateEvent: EventType = {
      _id: detailEvent._id,
      desc: desEvent,
      title: titleEdit,
      start: startTimePicker.toISOString(),
      end: endTimePicker.toISOString(),
      allDay: isAllDay,
      members: memers,
    };
    console.log('LlLlllllll', updateEvent);

    axios
      .patch(`calendar/event/`, { ...updateEvent })
      .then((res) => {
        setIsLoading(false);
        setIsEdit(!isEdit);
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(!isEdit);
      return;
    }
    handleSave();
  };

  console.log('test', startTimePicker.toString());

  useEffect(() => {
    axios
      .get(`/calendar/event/${eventId}`)
      .then((res) => {
        setDetailEvent(res.data);
        setDesEvent(res.data.desc === '' ? 'None' : res.data.desc);
        setTitleEdit(res.data.title);
        setStartTimePicker(dayjs(new Date(res.data.start)));
        setEndTimePicker(dayjs(new Date(res.data.end)));
        setIsAllDay(res.data.allDay);
        console.log(res.data);

        const tags = res.data.members.map((user) => {
          return {
            id: user._id,
            text: user.name,
          };
        });
        console.log(tags);

        setTags(tags);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/calendar/usersuggest`)
      .then((res) => {
        const users = res.data.map((user) => {
          return {
            id: user._id,
            text: user.name,
          };
        });
        console.log('test1', users);
        setUsersSuggest(users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="p-6">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <button
          className={
            'bg-white text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-10 transition-all  ' +
            (isEdit ? 'bg-green-400 hover:bg-green-500' : 'bg-[#4B358D] hover:bg-[#6752A3]')
          }
          onClick={() => handleEdit()}
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
      )}

      {!isEdit && (
        <Link href="/calendar">
          <button
            className={
              'font-semibold py-2 px-6 border-gray-400 rounded shadow-lg mb-2 transition-all ml-[300px] border'
            }
          >
            <MdSettingsBackupRestore className="inline-block mr-3" size={25} />
            Back to Canlendar
          </button>
        </Link>
      )}

      {isEdit && (
        <button
          className={
            'text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-2 transition-all bg-red-700 hover:bg-red-800 ml-[300px]'
          }
          onClick={() => setIsEdit(!isEdit)}
        >
          Cancel
        </button>
      )}
      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'secondary.main' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20 }}>Title</TableCell>
              <TableCell>
                {' '}
                <div className="flex">
                  {!isEdit && (
                    <>
                      <MdEventNote className="text-2xl text-colorHome mr-3" />
                      <div className="text-[1.4rem] font-medium inline-block">{titleEdit}</div>
                    </>
                  )}
                  {isEdit && (
                    <TextField
                      value={titleEdit}
                      fullWidth
                      onChange={(e) => setTitleEdit(e.target.value)}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align="left"
                component="th"
                className="max-w-[20vw] w-[20vw] break-words text-[1.5rem]"
                sx={{ fontSize: 20 }}
              >
                Time:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                {!isEdit && (
                  <div className="flex">
                    <BiTime className="text-2xl text-colorHome mt-1 mr-3" />
                    <div className="text-[1.4rem] inline-block">
                      {startTimePicker.format('LT')} - {endTimePicker.format('LT')}
                    </div>
                  </div>
                )}
                {isEdit && (
                  <div className="flex">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField', 'TimeField']}>
                        <TimeField
                          label="Start time"
                          value={startTimePicker}
                          onChange={(newValue) => setStartTimePicker(newValue ?? dayjs(new Date()))}
                          // format="HH:mm"
                          format="hh:mm A"
                          sx={{ marginRight: 10 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField', 'TimeField']}>
                        <TimeField
                          label="End time"
                          value={endTimePicker}
                          onChange={(newValue) => setEndTimePicker(newValue ?? dayjs(new Date()))}
                          // format="HH:mm"
                          format="hh:mm A"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                align="left"
                component="th"
                className="max-w-[20vw] w-[20vw] break-words"
                sx={{ fontSize: 20 }}
              >
                Type:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                {!isEdit && (
                  <div className="flex">
                    <MdAllInclusive className="text-2xl text-colorHome mt-1 mr-3" />
                    <div className="text-[1.4rem] inline-block">
                      {detailEvent.allDay ? 'Rest' : 'Regular'}
                    </div>
                  </div>
                )}
                {isEdit && (
                  <div>
                    {' '}
                    All Day{' '}
                    <Checkbox
                      color="secondary"
                      size="medium"
                      checked={isAllDay}
                      onChange={() => setIsAllDay(!isAllDay)}
                    />
                  </div>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                align="left"
                component="th"
                className="max-w-[20vw] w-[20vw] break-words"
                sx={{ fontSize: 20 }}
              >
                Date:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                {!isEdit && (
                  <div className="flex">
                    <BsCalendarDate className="text-2xl text-colorHome mt-1 mr-3" />
                    <div className="text-[1.4rem] inline-block">
                      {startTimePicker.format('DD/MM/YYYY')}
                      {startTimePicker.isBefore(endTimePicker)
                        ? ' - ' + endTimePicker.format('DD/MM/YYYY')
                        : null}
                    </div>
                  </div>
                )}
                {isEdit && (
                  <div className="flex">
                    <div className="mr-10">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            label="Select Date Start"
                            value={startTimePicker}
                            format="DD/MM/YYYY"
                            onChange={(newValue) =>
                              setStartTimePicker(newValue ?? dayjs(new Date()))
                            }
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Select Date End"
                          value={endTimePicker}
                          format="DD/MM/YYYY"
                          onChange={(newValue) => setEndTimePicker(newValue ?? dayjs(new Date()))}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                align="left"
                component="th"
                className="max-w-[30vw] w-[30vw] break-words"
                sx={{ fontSize: 20 }}
              >
                Members:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                <div className="flex">
                  {!isEdit && (
                    <IoIosPeople
                      className={'text-2xl text-colorHome mt-3' + (!isEdit ? 'mt-2' : ' ')}
                    />
                  )}
                  <div className="text-[1.2rem] inline-block">
                    <div className="">
                      <div className="z-[100000]">
                        <ReactTags
                          tags={tags}
                          suggestions={usersSuggest}
                          delimiters={[]}
                          handleDelete={(i) => {
                            deleteUserInEvent(tags[i]);
                            setTags(tags.filter((tag, index) => index !== i));
                          }}
                          handleAddition={(tag) => addUserInEvent(tag)}
                          inputFieldPosition="inline"
                          autocomplete
                          placeholder="Search to add new member..."
                          allowDragDrop={false}
                          readOnly={!isEdit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                align="left"
                component="th"
                className="max-w-[20vw] w-[20vw] break-words"
                sx={{ fontSize: 20 }}
              >
                Description:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                {!isEdit && (
                  <div className="flex">
                    <HiOutlineDocumentText
                      className={'text-2xl text-colorHome mt-3' + (!isEdit ? 'mt-2' : ' ')}
                    />
                    <div className="text-[1.4rem] inline-block">{desEvent ?? 'None'}</div>
                  </div>
                )}
                {isEdit && (
                  <textarea
                    value={desEvent}
                    className="block w-[80%] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md "
                    onChange={(e) => setDesEvent(e.target.value)}
                    rows={5}
                    cols={33}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <button
        className={
          'mt-8 text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-2 transition-all bg-red-500 hover:bg-red-600 '
        }
      >
        Delete
      </button>
    </div>
  );
};

export default DetailEvent;
