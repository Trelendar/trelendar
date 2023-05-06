import { CreateEventDto } from './dto/create-event.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  getAllEvent() {
    return [
      {
        name: 'Long',
        age: 18,
      },
    ];
  }

  createEvent(createCalendarDto: CreateEventDto): CreateEventDto {
    return {
      start: new Date(),
      end: new Date(),
      title: 'long',
      desc: 'None',
      members: [],
      allDay: false,
    };
  }
}
