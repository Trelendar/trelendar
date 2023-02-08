import { Injectable } from '@nestjs/common';
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
    const board = await this.boardModel.findByIdAndUpdate(
      id,
      { $pull: { members: new Types.ObjectId(idRemove) } },
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

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
