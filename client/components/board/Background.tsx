import { useState } from 'react';
import axios from '../../lib/axios';
import { BoardType } from '../../share/type/kanban';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';

const Background = ({
  board: { background, _id },
  handleRefetchBoard,
}: {
  board: BoardType;
  handleRefetchBoard: () => void;
}) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/upload', formData);
      response && (await axios.patch(`/board/${_id}`, { background: response.data.url }));
      await handleRefetchBoard();
      console.log(response.data); // handle the server response
      Swal.fire('Change success', '', 'success');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex gap-1 items-start flex-col">
      <div className="flex gap-1 items-center mb-3">
        <p>Background:</p>
        <img src={background} width={350} height={350} className="" />
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input type="file" onChange={handleFileUpload} />
          <Button color="primary" type="submit" sx={'text-transform: capitalize !important;'}>
            Change background
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Background;
