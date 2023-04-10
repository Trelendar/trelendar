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

const DetailEvent: React.FC = () => {
  const detailEvent: EventType = {
    id: '1',
    start: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
    allDay: false,
    title: 'New Event',
    desc: 'This is new Event',
    members: ['Nguyen Thanh Long', 'Nguyen Tran Hoang'],
  };
  //@ts-ignore
  const startEvent = new Date(detailEvent.start);
  const endEvent = new Date(detailEvent.end);

  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [timePicker, setTimePicker] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
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
                  <MdEventNote className="text-2xl text-colorHome mr-3" />
                  <div className="text-[1.4rem] font-medium inline-block">{detailEvent.title}</div>
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

            <TableRow key={detailEvent.id}>
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
                      <DatePicker label="Basic date picker" />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              </TableCell>
            </TableRow>

            <TableRow key={detailEvent.id}>
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
                  <IoIosPeople className="text-2xl text-colorHome mt-1 mr-3" />
                  <div className="text-[1.4rem] inline-block">
                    {detailEvent.members?.map(member => member + ', ')}
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow key={detailEvent.id}>
              <TableCell
                align="left"
                component="th"
                className="max-w-[20vw] w-[20vw] break-words"
                sx={{ fontSize: 20 }}
              >
                Description:
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>
                <div className="flex">
                  <HiOutlineDocumentText className="text-2xl text-colorHome mt-1 mr-3" />
                  <div className="text-[1.4rem] inline-block">{detailEvent.desc ?? 'None'}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailEvent;
