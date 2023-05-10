export interface EventType {
  _id: string;
  start: Date | string;
  allDay?: boolean;
  end: Date | string;
  title: string;
  desc?: string;
  members?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
