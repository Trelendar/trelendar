import { CreateRepeatDto } from './dto/create-repeat.dto';
import { ObjectId } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';
import { UpdateEventDto } from './dto/update-event.dto';
import { DeleteEventDto } from './dto/delete-event.dto';

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
    return await this.calendarService.getUserCanAccess(user._id, false);
  }

  @Get('/usersuggest')
  @UseGuards(JwtAuthGuard)
  async getUserSuggest(@CurrentUser() user: User) {
    return await this.calendarService.getUserCanAccess(user._id, true);
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

  @Patch('event/')
  @UseGuards(JwtAuthGuard)
  async updateEvent(@Body() updateEvent: UpdateEventDto) {
    return await this.calendarService.update(updateEvent);
  }

  @Delete('event/')
  @UseGuards(JwtAuthGuard)
  async removeEvent(@Body() eventId: DeleteEventDto) {
    return await this.calendarService.remove(eventId);
  }

  @Post('/repeat')
  @UseGuards(JwtAuthGuard)
  async createRepeat(
    @Body() event: CreateRepeatDto,
    @CurrentUser() user: User,
  ) {
    return this.calendarService.createRepeat(event, user._id);
  }
}
