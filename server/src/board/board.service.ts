import { CustomException } from './../error/index';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema, Types } from 'mongoose';
import { Board, BoardDocument } from './entities/board.entity';
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

  async getOne(user: User, id: string) {
    try {
      const board = await this.boardModel.findOne({
        _id: convertToObjectId(id),
        members: { $in: [user._id] },
      });
      if (!board) throw new CustomException('Board not found');
      return board;
    } catch (error) {
      throw new CustomException('Board not found or not access');
    }
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
}