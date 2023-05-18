import { BoardService } from './../board/board.service';
import { UserService } from './../user/user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { Model, ObjectId, Types } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';
import { DeleteEventDto } from './dto/delete-event.dto';

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
    const { start, end, title, desc, allDay, members } = createCalendarDto;
    const event = await new this.eventModel({
      start,
      end,
      title,
      desc,
      allDay,
      members: [userId, ...members],
    }).save();
    return event;
  }

  async getUserCanAccess(userId: ObjectId, isGetLoggedUser: boolean) {
    const memberIdList = await this.boardService.getAllMembersInBoardAccess(
      userId,
      isGetLoggedUser,
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
    if (!event) {
      throw new HttpException('Event not found', 403);
    }
    const memberUsers =
      event?.members.map((memberId) => memberId.toString()) ?? [];

    const members = await this.userService.findUsersByList(memberUsers);
    const result = Object(event);
    result.members = members;

    return result;
  }

  async update(updateEvent: UpdateEventDto) {
    const memberIdsToObjects = updateEvent.members.map(
      (memberId) => new Types.ObjectId(memberId),
    );
    const event = await this.eventModel.findOneAndUpdate(
      { _id: updateEvent._id },
      { ...updateEvent, members: memberIdsToObjects },
      { new: true },
    );
    if (!event) {
      throw new HttpException('Event not found', 403);
    }
    return event;
  }

  async remove(deleteEventDto: DeleteEventDto) {
    const result = await this.eventModel.findOneAndDelete({
      _id: new Types.ObjectId(deleteEventDto.eventId),
    });
    if (!result) {
      throw new HttpException('Event not found', 403);
    }
    return `This action removes a #${deleteEventDto.eventId} board`;
  }
}
