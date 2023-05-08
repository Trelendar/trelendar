import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import axios from '../../../lib/axios';
import { useQuery } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select, { components } from 'react-select';
import Checkbox from '@mui/material/Checkbox';

import { CardType } from '../../../share/type/kanban';
import lodash from 'lodash';
import Swal from 'sweetalert2';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}
const fetchMember = async (id: string) => {
  const res = await axios.get(`/board/${id}/members`);
  return res.data as User[];
};

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = 'transparent';
  if (isFocused) bg = '#eee';
  if (isActive) bg = '#B2D4FF';

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex ',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      <div className="text-[#172b4d] text-sm ml-1 flex items-center min-w-[180px] gap-1 cursor-pointer rounded">
        <Avatar className="!w-6 !h-6" alt={rest.value.name} src={rest.value.image} />
        <span className="flex">{rest.value.name}</span>
      </div>
    </components.Option>
  );
};
const Member = ({ user }: { user: User }) => {
  return (
    <div className="text-[#172b4d] text-sm flex items-center min-w-[180px] gap-1 cursor-pointer rounded">
      <Avatar className="!w-6 !h-6" alt={user.name} src={user.image} />
      <span className="flex">{user.name}</span>
    </div>
  );
};

export const MemberAction = ({ card }: { card: CardType }) => {
  const [selectedOptions, setSelectedOptions] = useState<User[]>(card.members);

  const handleSelectBlur = async () => {
    const current = card.members;
    const diff1 = lodash.differenceBy(selectedOptions, current, '_id');
    const diff2 = lodash.differenceBy(current, selectedOptions, '_id');

    if (!diff1.length && !diff2.length) return;
    const assignIds = selectedOptions.map((selected) => selected._id);
    try {
      const res = await axios.patch(`card/${card._id}/assign`, { assignIds });
    } catch (error) {
      Swal.fire('', error.message, 'error');
    }
    // Save the selected option here
  };
  const router = useRouter();
  const { data: users, isLoading } = useQuery<User[]>(['member', router.query.slug], () =>
    fetchMember(router.query.slug as string)
  );
  const allOptions = users?.map((user) => ({
    value: user,
    label: user.name,
  }));
  // const isOptionSelected = (option) => {
  //   return selectedOptions.some((selectedOption) => selectedOption._id === option.value._id);
  // };
  if (isLoading) return <h1>loading</h1>;
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: '6px 12px',
      cursor: 'pointer',
      backgroundColor: state.isSelected ? 'lightblue' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '& input': {
        marginRight: '6px',
      },
    }),
  };
  return (
    <div>
      <>
        <Select
          defaultValue={selectedOptions.map((member) => ({ value: member, label: member.name }))}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(options) => {
            if (Array.isArray(options)) {
              setSelectedOptions(options.map((opt) => opt.value));
            }
          }}
          styles={customStyles}
          onBlur={handleSelectBlur}
          options={allOptions}
          components={{
            Option: InputOption,
          }}
        />
      </>
    </div>
  );
};
