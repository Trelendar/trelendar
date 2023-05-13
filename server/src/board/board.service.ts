import { CustomException } from './../error/index';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema, Types, ObjectId } from 'mongoose';
import { Board, BoardDocument, BoardSchema } from './entities/board.entity';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { convertToObjectId } from 'src/util';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    private readonly userService: UserService,
  ) {}

  // hard code user-created and not check validate data in members
  async create(
    userId: Schema.Types.ObjectId,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const defaultBackgroud =
      'https://cdn.vietnambiz.vn/2019/10/27/kanban-project-management-15721743128351256247490.png';
    const board = new this.boardModel({
      ...createBoardDto,
      createdBy: userId,
      background: createBoardDto.background || defaultBackgroud,
      members: [...new Set([...(createBoardDto.members || []), userId])],
    });
    return await board.save();
  }
  async removeOne(id: string, idRemove: string): Promise<Board> {
    const boardRemoved = await this.boardModel.findById(id);
    console.log(boardRemoved?.id, idRemove);

    if (String(boardRemoved?.createdBy._id) === idRemove)
      throw new HttpException(
        'Cannot remove because you are create board',
        404,
      );
    const board = await this.boardModel.findByIdAndUpdate(
      id,
      { $pull: { members: new Types.ObjectId(idRemove) } },
      { new: true },
    );
    if (!board) throw Error('id not found');
    return board;
  }
  async addOne(id: string, idAdded: string): Promise<Board> {
    const board = await this.boardModel.findByIdAndUpdate(
      id,
      { $addToSet: { members: new Types.ObjectId(idAdded) } },
      { new: true },
    );
    if (!board) throw Error('id not found');
    return board;
  }

  async getAllBoard(id: Schema.Types.ObjectId): Promise<Board[]> {
    const list = await this.boardModel.find({ members: { $in: [id] } });
    return list;
  }
  async getById(id: string) {
    try {
      const board = await this.boardModel
        .findOne({
          _id: convertToObjectId(id),
        })
        .populate({
          path: 'columns',
          options: {
            sort: { order: 1 },
          },
          populate: {
            path: 'cards',
            options: {
              sort: { order: 1 },
            },
          },
        });
      if (!board) throw new CustomException('Board not found');
      return board;
    } catch (error) {
      throw new CustomException('Board not found or not access');
    }
  }
  async getMember(id: string, user: User) {
    if (!(await this.checkExitUserForBoard(user._id, id)))
      throw new CustomException('You not in board');
    try {
      const board = await this.boardModel
        .findOne({
          _id: convertToObjectId(id),
        })
        .populate({
          path: 'members',
        });
      if (!board) throw new CustomException('Board not found');
      return board.members;
    } catch (error) {
      throw new CustomException('Board not found or not access');
    }
  }
  async getOne(user: User, id: string) {
    try {
      const board = await this.boardModel
        .findOne({
          _id: id,
          members: { $in: [user._id] },
        })
        .populate({
          path: 'columns',
          options: {
            sort: { order: 1 },
          },
          populate: {
            path: 'cards',
            options: {
              sort: { order: 1 },
            },
          },
        });
      if (!board) throw new CustomException('Board not found');
      return board;
    } catch (error) {
      throw new CustomException('Board not found or not access');
    }
  }
  async checkExitUserForBoard(
    idUser: mongoose.Schema.Types.ObjectId,
    id: string,
  ): Promise<boolean> {
    const board = await this.boardModel
      .findOne({
        _id: convertToObjectId(id),
        members: { $in: [idUser] },
      })
      .populate({
        path: 'columns',
        options: {
          sort: { order: 1 },
        },
        populate: {
          path: 'cards',
          options: {
            sort: { order: 1 },
          },
        },
      });
    if (!board) return false;
    return true;
  }
  async checkExitUsersForBoard(
    userIds: string[],
    id: string,
  ): Promise<boolean> {
    const board = await this.boardModel
      .findOne({
        _id: convertToObjectId(id),
        members: { $in: userIds },
      })
      .populate({
        path: 'columns',
        options: {
          sort: { order: 1 },
        },
        populate: {
          path: 'cards',
          options: {
            sort: { order: 1 },
          },
        },
      });
    if (!board) return false;
    return true;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardModel.findByIdAndUpdate(id, updateBoardDto, {
      new: true,
    });
    if (!board) throw new HttpException('Board not found', 403);
    return board;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }

  async addColumnOnBoard(id: string, idColumn: mongoose.Schema.Types.ObjectId) {
    const board = await this.boardModel.findById(id);
    if (!board) throw new HttpException('Not found', 403);
    await this.boardModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { columns: idColumn },
      },
      { new: true },
    );
  }
  async addMemberToBoard(id: string, userId: mongoose.Schema.Types.ObjectId) {
    const isExistedUser = await this.checkExitUserForBoard(userId, id);
    console.log(
      '🚀 ~ file: board.service.ts:164 ~ BoardService ~ addMemberToBoard ~ existedUser:',
      isExistedUser,
    );
    if (isExistedUser) return;
    const board = await this.boardModel.findById(id);
    if (!board) throw new HttpException('Not found', 403);
    return await this.boardModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { members: userId },
      },
      { new: true },
    );
  }

  async findByColumn(columnId: string, user: User) {
    try {
      const board = await this.boardModel.findOne({
        columns: { $in: [columnId] },
        members: { $in: [user._id] },
      });
      if (!board) throw new CustomException('Column not found');
      return board;
    } catch (error) {
      throw new CustomException('Column not found or not access');
    }
  }

  async getAllMembersInBoardAccess(userId: ObjectId, isGetLoggedUser: boolean) {
    const allBoardCanAccess = await this.boardModel.find({
      members: { $all: [userId] },
    });
    let membersList: Array<any> = [];
    allBoardCanAccess.forEach((board) => {
      const convertToString = board.members.map((member: User) =>
        member._id.toString(),
      );
      membersList = membersList.concat(convertToString);
    });

    const uniqueMembers = membersList.filter((element, index) => {
      return membersList.indexOf(element) === index;
    });
    const hasNoLoginedUserList = !isGetLoggedUser
      ? uniqueMembers.filter((_id) => _id !== userId.toString())
      : uniqueMembers;
    return hasNoLoginedUserList;
  }
}
