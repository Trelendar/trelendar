import React, { useState } from 'react';
import { EventType } from '../../share/type/calendar';
import { MdEventNote } from 'react-icons/md';
import { date } from 'yup/lib/locale';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  return (
    <div className="p-6">
      <button
        className={
          'bg-white text-white font-semibold py-2 px-6 border-0 border-gray-400 rounded shadow-lg mb-2 transition-all  ' +
          (isEdit ? 'bg-green-400 hover:bg-green-500' : 'bg-[#4B358D] hover:bg-[#6752A3]')
        }
        onClick={() => setIsEdit(!isEdit)}
      >
        {isEdit ? 'Save' : 'Edit'}
      </button>
      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'secondary.main' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>
                {' '}
                <div className="flex">
                  <MdEventNote className="text-2xl text-colorHome" />
                  <div className="text-[1.2rem] font-medium inline-block">{detailEvent.title}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" component="th" className="max-w-[20vw] w-[20vw] break-words">
                Time:
              </TableCell>
              <TableCell align="left">
                {startEvent.getHours() + ':' + startEvent.getMinutes()} -{' '}
                {endEvent.getHours() + ':' + endEvent.getMinutes()}
              </TableCell>
            </TableRow>

            <TableRow key={detailEvent.id}>
              <TableCell align="left" component="th" className="max-w-[20vw] w-[20vw] break-words">
                Date:
              </TableCell>
              <TableCell align="left">
                {startEvent.getDate() +
                  '/' +
                  startEvent.getMonth() +
                  '/' +
                  startEvent.getFullYear()}
              </TableCell>
            </TableRow>

            <TableRow key={detailEvent.id}>
              <TableCell align="left" component="th" className="max-w-[20vw] w-[20vw] break-words">
                Members:
              </TableCell>
              <TableCell align="left">
                {detailEvent.members.map((member) => member + ', ')}
              </TableCell>
            </TableRow>

            <TableRow key={detailEvent.id}>
              <TableCell align="left" component="th" className="max-w-[20vw] w-[20vw] break-words">
                Description:
              </TableCell>
              <TableCell align="left">
                {detailEvent.desc ?? 'None'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailEvent;
