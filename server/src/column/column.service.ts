import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, ColumnDocument } from './entities/column.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BoardService } from 'src/board/board.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    private readonly boardService: BoardService,
  ) {}
  async create(createColumnDto: CreateColumnDto, user: User): Promise<Column> {
    const { boardId, title } = createColumnDto;
    await this.boardService.getOne(user, boardId);
    const column = await new this.columnModel({
      ...createColumnDto,
      order: 'random string',
    }).save();

    await this.boardService.addColumnOnBoard(
      createColumnDto.boardId,
      column._id,
    );
    return column;
  }

  findAll() {
    return `This action returns all column`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto, user: User) {
    this.boardService.findByColumn(id, user);
    await this.columnModel.findByIdAndUpdate(id, { ...updateColumnDto });
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
  // private;
  async getColumnForBoardId(boardId: string, user: User) {
    const board = await (
      await this.boardService.getOne(user, boardId)
    ).populate('columns');
    // return board.columns;
    return board.columns;
  }
}
