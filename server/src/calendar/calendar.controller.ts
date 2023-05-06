import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { async } from 'rxjs';

@Controller('calendar')
export class CanlendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getAllEvent() {
    return [
      {
        name: 'Long',
        age: 18,
      },
    ];
  }

  //   @Get(':id')
  //   getEventById(@Param('id') id: string) {}

  @Post()
  createEvent(@Body() event: CreateEventDto): CreateEventDto {
    return this.calendarService.createEvent(event);
  }
}
