import React, { useState } from 'react';
import { EventType } from '../../share/type/calendar';
import { MdEventNote } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { HiOutlineDocumentText } from 'react-icons/hi';
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
import { Tag, UserCard } from '../../share/type/kanban';
import { WithContext as ReactTags } from 'react-tag-input';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

const DetailEvent: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([
    {
      id: '1',
      text: 'Long',
    },
    {
      id: '2',
      text: 'Hoang',
    },
  ]);
  const [users, setUsers] = useState<Tag[]>([
    {
      id: '1',
      text: 'Long',
    },
    {
      id: '2',
      text: 'Hoang',
    },
    {
      id: '3',
      text: 'Hai',
    },
    {
      id: '4',
      text: 'Ngoc',
    },
  ]);
  const addUserInCard = (tag: Tag) => {
    // const userInCard: UserCard = {
    //   controller: CONTROLLER_ADD_USER_IN_CARD,
    //   userId: Number(tag.id),
    //   cardId: cardId,
    // };
    // addUserInCardService(userInCard);
    setTags([...tags, tag]);
  };

  const deleteUserInCard = (tag: Tag) => {
    // const userInCard: UserCard = {
    //   controller: CONTROLLER_DEL_USER_IN_CARD,
    //   userId: Number(tag.id),
    //   cardId: cardId,
    // };
    // deleteUserInCardService(userInCard);
  };

  //   const boardId = useMySelector((state) => state.board.id);
  //   useEffect(() => {
  //     userInBoardService(boardId).then((res) => {
  //       setUsers(res.data.users ?? []);
  //       userInCardService(cardId).then((res) => setTags(res.data.users ?? []));
  //     });
  //   }, [tags]);

  const detailEvent: EventType = {
    id: '1',
    start: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
    allDay: false,
    title: 'New Event',
    desc: 'This is new Event lorem This is new Event lorem This is new Event lorem This is new Event lorem This is new Event lorem',
    members: ['update to react-tag-input'],
  };
  //@ts-ignore
  const startEvent = new Date(detailEvent.start);
  const endEvent = new Date(detailEvent.end);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [timePicker, setTimePicker] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [desEvent, setDesEvent] = useState<string>(detailEvent.desc ?? 'None');
  const [titleEdit, setTitleEdit] = useState<string>(detailEvent.title);
  const changeFormat = (stringInput: string) => {};

  const handleSave = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="p-6">
      <button
        className={
          'bg-white text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-2 transition-all  ' +
          (isEdit ? 'bg-green-400 hover:bg-green-500' : 'bg-[#4B358D] hover:bg-[#6752A3]')
        }
        onClick={() => handleSave()}
      >
        {isEdit ? 'Save' : 'Edit'}
      </button>

    {!isEdit &&<Link href="/calendar">
     <button
      className={
        'text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-2 transition-all bg-red-500 hover:bg-red-600 ml-[300px]'
      }
      onClick={() => handleSave()}
    >
      Back to Canlendar
    </button>
    </Link>}

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
                      <div className="text-[1.4rem] font-medium inline-block">
                        {detailEvent.title}
                      </div>
                    </>
                  )}
                  {isEdit && <TextField value={titleEdit} fullWidth />}
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
                      {startEvent.getHours() + ':' + startEvent.getMinutes()} -{' '}
                      {endEvent.getHours() + ':' + endEvent.getMinutes()}
                    </div>
                  </div>
                )}
                {isEdit && (
                  <div className="flex">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField', 'TimeField']}>
                        <TimeField
                          label="Start time"
                          value={timePicker}
                          onChange={(newValue) => setTimePicker(newValue)}
                          format="HH:mm"
                          sx={{ marginRight: 10 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimeField', 'TimeField']}>
                        <TimeField
                          label="End time"
                          value={timePicker}
                          onChange={(newValue) => setTimePicker(newValue)}
                          format="HH:mm"
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
                Date:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                {!isEdit && (
                  <div className="flex">
                    <BsCalendarDate className="text-2xl text-colorHome mt-1 mr-3" />
                    <div className="text-[1.4rem] inline-block">
                      {startEvent.getDate() +
                        '/' +
                        startEvent.getMonth() +
                        '/' +
                        startEvent.getFullYear()}
                    </div>
                  </div>
                )}
                {isEdit && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Select Date"
                        value={dayjs(detailEvent.start)}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                          suggestions={users}
                          delimiters={[]}
                          handleDelete={(i) => {
                            deleteUserInCard(tags[i]);
                            setTags(tags.filter((tag, index) => index !== i));
                          }}
                          handleAddition={(tag) => addUserInCard(tag)}
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
                    <div className="text-[1.4rem] inline-block">{detailEvent.desc ?? 'None'}</div>
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
    </div>
  );
};

export default DetailEvent;
