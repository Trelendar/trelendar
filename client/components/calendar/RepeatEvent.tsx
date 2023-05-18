import Checkbox from '@mui/material/Checkbox';
import React, { FC, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { WithContext as ReactTags } from 'react-tag-input';
import { Tag } from '../../share/type/kanban';
import Tooltip from '@mui/material/Tooltip';

export interface Props {
  usersSuggest: Tag[];
}

const RepeatEvent: FC<Props> = (props) => {
  const { usersSuggest } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startTimePickker, setStartTimePickker] = useState<Date>(new Date());
  const [endTimePickker, setEndTimePickker] = useState<Date>(new Date());
  const [tags, setTags] = useState<Tag[]>([]);

  const deleteUserInEvent = (tag: Tag) => {};
  const addUserInEvent = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={() => open()}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-4 border-b-4 border-indigo-800 hover:border-indigo-700 rounded transition-all"
      >
        Repeat event
      </button>

      {isOpen && (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[800px] my-6 mx-auto">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-[#919bab] ml-5">Repeat Event</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    // onClick={() => setIsShowNewEvent(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className="ml-10 flex mt-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label="Start time"
                      value={startTimePickker}
                      onChange={(newValue) => setStartTimePickker(newValue ?? new Date())}
                      // format="HH:mm"
                      format="hh:mm A"
                      sx={{ marginRight: 10 }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label="End time"
                      value={endTimePickker}
                      onChange={(newValue) => setEndTimePickker(newValue ?? new Date())}
                      // format="HH:mm"
                      format="hh:mm A"
                    />
                  </LocalizationProvider>
                </div>

                <div className="ml-10 mt-5">
                  <FormControl>
                    <Tooltip title="Delete">
                      <FormLabel id="demo-radio-buttons-group-label" color="secondary">
                        Option
                      </FormLabel>
                    </Tooltip>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="EveryDay"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="EveryDay"
                        control={<Radio color="secondary" />}
                        label="EveryDay"
                      />
                      <div className="flex-auto">
                        <FormControlLabel
                          value="Monday"
                          control={<Radio color="secondary" />}
                          label="Monday"
                        />
                        <FormControlLabel
                          value="Tuesday"
                          control={<Radio color="secondary" />}
                          label="Tuesday"
                        />
                        <FormControlLabel
                          value="Wednesday"
                          control={<Radio color="secondary" />}
                          label="Wednesday"
                        />
                        <FormControlLabel
                          value="Thursday"
                          control={<Radio color="secondary" />}
                          label="Thursday"
                        />
                        <FormControlLabel
                          value="Friday"
                          control={<Radio color="secondary" />}
                          label="Friday"
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="relative px-10 pt-4 flex-auto">
                  <span className="my-4 text-slate-500 text-lg leading-relaxed">
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Event title
                      </label>
                      <input
                        // ref={inputTitleRef}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // onChange={(evt) => onInputTitle(evt)}
                        // onKeyDown={(e) => e.key === 'Escape' && setIsShowNewEvent(false)}
                      />
                    </div>
                  </span>
                </div>
                <div className="ml-10 mb-4">
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
                      // readOnly={!isEdit}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                  <button
                    className="text-[#BCB4D8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // onClick={onSaveChanges}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
};

export default RepeatEvent;
