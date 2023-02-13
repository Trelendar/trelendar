import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, ColumnDocument } from './entities/column.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    private readonly boardService: BoardService,
  ) {}
  async create(createColumnDto: CreateColumnDto): Promise<Column> {
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

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
