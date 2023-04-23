import React, { useEffect, useRef, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import axios from '../../../lib/axios';
import { CardType } from '../../../share/type/kanban';
interface DescriptionProps {
  card: CardType;
}
const Description = ({ card: { description, _id, columnId } }: DescriptionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toggleEdit = () => setIsEdit((pre) => !pre);
  const handleSaveDescription = async () => {
    if (!value || value === description) return;
    await axios.patch(`/card/${_id}`, {
      description: value,
      columnId,
      oldColumnId: columnId,
    });
    toggleEdit();
  };
  useEffect(() => {
    if (isEdit && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEdit]);
  return (
    <div className="flex items-start gap-2">
      <DescriptionIcon className="mt-1" />
      <div className="w-full">
        <div className="flex gap-2 items-center mb-3">
          <p className="text-base font-semibold">Description</p>
          {isEdit ? (
            <InfoIcon />
          ) : (
            <button
              className="px-3 py-1.5 bg-[#091e420f] rounded hover:bg-[#0203040f]"
              onClick={() => {
                toggleEdit();
                // if (textareaRef.current) {
                //   textareaRef.current.focus();
                // }
                // textareaRef.current.focus();
                console.log(
                  '🚀 ~ file: Description.tsx:38 ~ Description ~ textareaRef.current:',
                  textareaRef.current
                );
              }}
            >
              Edit
            </button>
          )}
        </div>
        {isEdit ? (
          <>
            <TextareaAutosize
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="empty textarea"
              placeholder="Enter the description for this card."
              className="w-full min-h-[200px] h-[200px] p-3"
            />
            <div className="flex items-center gap-2 mt-1">
              <Button
                variant="contained"
                size="small"
                className="!capitalize"
                onClick={handleSaveDescription}
              >
                Save
              </Button>
              <Button variant="text" size="small" className="!capitalize" onClick={toggleEdit}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <span className="inline-block" onClick={toggleEdit}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default Description;
