import { BoardService } from './../board/board.service';
import { UserService } from './../user/user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  async findAllByJWT(userId: ObjectId) {
    const results = await this.eventModel.find({ members: { $all: [userId] } });
    return results;
  }

  async create(createCalendarDto: CreateEventDto, userId: ObjectId) {
    const { start, end, title, desc, allDay } = createCalendarDto;
    const event = await new this.eventModel({
      start,
      end,
      title,
      desc,
      allDay,
      members: [userId],
    }).save();
    return event;
  }

  async getUserCanAccess(userId: ObjectId) {
    const memberIdList = await this.boardService.getAllMembersInBoardAccess(
      userId,
    );

    return this.userService.findUsersByList(memberIdList);
  }

  async findAllByUserId(userId: string) {
    const objectId = new Types.ObjectId(userId);
    const results = await this.eventModel.find({
      members: { $all: [objectId] },
    });
    return results;
  }

  async findEventById(eventId: string) {
    const event = await this.eventModel
      .findOne({
        _id: new Types.ObjectId(eventId),
      })
      .exec();

    const memberUsers =
      event?.members.map((memberId) => memberId.toString()) ?? [];

    const members = await this.userService.findUsersByList(memberUsers);
    const result = Object(event);
    result.members = members;

    return result;
  }
}
