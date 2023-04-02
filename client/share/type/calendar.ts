import { string } from "yup"

export interface EventType {
  id: string;
  start: Date | string;
  allDay?: boolean;
  end: Date | string;
  title: string;
  desc?: string;
  members?: String[]
}