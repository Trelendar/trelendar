import { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};

export type Card = {
  id: Id;
  _id:string;
  order:string;
  title:string;
  attachment:string[];
  comments:string[];
  members:string[];
  content: string;
  author: Author;
};

export type Dragging = {
  id: DraggableId;
  location: DraggableLocation;
};

export type BoardMap = {
  [key: string]: Card[];
};

export type Task = {
  id: Id;
  content: string;
};
