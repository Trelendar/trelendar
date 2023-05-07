import { async } from 'rxjs';
import { CreateEventDto } from './dto/create-event.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './entities/event.entity';
import mongoose, { Model, ObjectId } from 'mongoose';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAllByUserId(userId: ObjectId) {
    const results = await this.eventModel.find({ members: { $all: [userId] } });
    return results;
  }

  async create(createCalendarDto: CreateEventDto) {
    const { start, end, title, desc, allDay, members } = createCalendarDto;
    const newMembers = members.map(
      (member) => new mongoose.Types.ObjectId(member),
    );
    const event = await new this.eventModel({
      start,
      end,
      title,
      desc,
      allDay,
      members: newMembers,
    }).save();
    return event;
  }
}
