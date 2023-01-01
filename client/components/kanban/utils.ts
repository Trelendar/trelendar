import { DropResult } from 'react-smooth-dnd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CANCEL_BUTTON = 'Cancel';
const YES_BUTTON = 'Yes';

export const applyDrag = (arr: any[], dragResult: DropResult): any[] => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const confirmDelete = (dispatch: Function) => {
  confirmAlert({
    message: 'Are you sure ?',
    buttons: [
      {
        label: YES_BUTTON,
        onClick: () => dispatch(true),
      },
      {
        label: CANCEL_BUTTON,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
  });
};

export const confirmDeleteCard = (dispatch: Function) => {
  confirmAlert({
    message: 'Are you sure ?',
    buttons: [
      {
        label: YES_BUTTON,
        onClick: () => dispatch(),
      },
      {
        label: CANCEL_BUTTON,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
  });
};
