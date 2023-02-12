import { HttpException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Board, BoardDocument } from './entities/board.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    private readonly userService: UserService,
  ) {}

  // hard code user-created and not check validate data in members
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const user = await this.userService.findOne('6357e3b11e31cc69e54b24e8');
    const board = new this.boardModel({
      ...createBoardDto,
      createdBy: user?.id,
      members: [...new Set([...createBoardDto.members, user?.id])],
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

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
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
}
