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
    return await this.calendarService.findAllByJWT(user?._id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEvent: CreateEventDto, @CurrentUser() user: User) {
    return await this.calendarService.create(createEvent, user._id);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return await this.calendarService.getUserCanAccess(user._id);
  }

  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  async findAllUserId(@Param('_id') _id: string) {
    return await this.calendarService.findAllByUserId(_id);
  }

  @Get('event/:_id')
  @UseGuards(JwtAuthGuard)
  async getEventById(@Param('_id') _id: string) {
    return await this.calendarService.findEventById(_id);
  }
}
