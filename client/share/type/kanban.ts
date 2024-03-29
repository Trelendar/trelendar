export interface CardType {
  _id: string;
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  priority?: string;
  order: string;
  columnTitle: string;
  members: {
    email: string;
    image: string;
    name: string;
    _id: string;
  }[];
  comments: {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      name: string;
      _id: string;
      image: string;
    };
  }[];
}

export interface ColumnType {
  _id?: string;
  id: string;
  boardId: string;
  createdAt?: Date;
  order: string;
  title: string;
  cardOrder: string[];
  cards: CardType[];
}

export interface BoardType {
  _id: string;
  id: string;
  name: string;
  background: string;
  boardName?: string;
  columnOrder: String[];
  columns: ColumnType[];
}

export interface DropResult {
  removedIndex: number;
  addedIndex: number;
  payload: object;
  element: HTMLElement;
}

export interface Tag {
  id: string;
  text: string;
}

export interface KanbanResponse {
  data: {
    status: string;
    cards?: CardType[];
    columns?: ColumnType[];
    boards?: BoardType[];
    card?: CardType;
  };
}

export interface TagUser {
  data: {
    status: string;
    users: Tag[];
  };
}

export interface ColumnRequest {
  controller: string;
  boardId?: string;
  columnId: string;
  order?: number;
  title?: string;
}

export interface CardRequest {
  controller: string;
  boardId?: string;
  columnId?: string;
  order?: number;
  title?: string;
  cardId: string;
  description?: string;
  priority?: string;
}

export interface DropRequest {
  controller: string;
  addedIndex?: number;
  removedIndex?: number;
  columnId?: string;
  cardId?: string;
  oldColumnId?: string;
  newColumnId?: string;
  oldIndex?: number;
  newIndex?: number;
  lastIndexInNewCol?: number;
}

export interface UserCard {
  controller: string;
  userId: number;
  cardId: string;
}
