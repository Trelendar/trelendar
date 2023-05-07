import { async } from 'rxjs';
import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';

@Controller('calendar')
export class CanlendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@CurrentUser() user: User) {
    return await this.calendarService.findAllByUserId(user?._id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEvent: CreateEventDto) {
    return await this.calendarService.create(createEvent);
  }
}
