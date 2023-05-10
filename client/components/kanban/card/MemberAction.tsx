import Avatar from '@mui/material/Avatar';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from '../../../lib/axios';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select, { components } from 'react-select';

import lodash from 'lodash';
import Swal from 'sweetalert2';
import { CardType } from '../../../share/type/kanban';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function toggleArrayElementById(array, element) {
  const newarr = [...array];
  const index = newarr.findIndex((obj) => obj._id === element._id);
  if (index !== -1) {
    newarr.splice(index, 1);
  } else {
    newarr.push(element);
  }
  return newarr;
}
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
  const checked = rest
    .getValue()
    .map((option) => option.value._id)
    .includes(rest.value._id);
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
      isSelected={checked}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={checked} />
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

export const MemberAction = ({
  card,
  handleRefetchCard,
}: {
  card: CardType;
  handleRefetchCard: () => void;
}) => {
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
    await handleRefetchCard();
  };
  const router = useRouter();
  const { data: users, isLoading } = useQuery<User[]>(['member', router.query.slug], () =>
    fetchMember(router.query.slug as string)
  );
  const allOptions = users?.map((user) => ({
    value: user,
    label: user.name,
  }));

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
    <div className="w-full col-span-1">
      <>
        <Select
          value={selectedOptions.map((member) => ({ value: member, label: member.name }))}
          // defaultValue={selectedOptions.map((member) => ({ value: member, label: member.name }))}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(options, actionMeta) => {
            if (Array.isArray(options)) {
              const uniqueArr = options
                .map((opt) => opt.value)
                .filter((item, index, self) => {
                  return index === self.findIndex((t) => t._id === item._id);
                });
              const newOption =
                uniqueArr.length === options.length || actionMeta.action === 'remove-value'
                  ? uniqueArr
                  : toggleArrayElementById(uniqueArr, actionMeta.option.value);

              setSelectedOptions(newOption);
            }
          }}
          styles={customStyles}
          onBlur={handleSelectBlur}
          options={allOptions}
          components={{
            Option: (props) => <InputOption {...props} />,
          }}
        />
      </>
    </div>
  );
};
