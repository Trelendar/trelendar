import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, ColumnDocument } from './entities/column.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BoardService } from 'src/board/board.service';
import { User } from 'src/user/entities/user.entity';
import { CustomException } from 'src/error';

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
    await this.boardService.findByColumn(id, user);
    await this.columnModel.findByIdAndUpdate(id, { ...updateColumnDto });
    return `This action updates a #${id} column`;
  }

  async remove(id: string, user: User) {
    await this.boardService.findByColumn(id, user);
    const column = await this.columnModel.findById(id);
    if (column?.cards.length)
      throw new CustomException('Card in column in availale');
    await this.columnModel.deleteOne({ _id: id });
    return `This action removes a #${id} column`;
  }
  // private;
  async getColumnForBoardId(boardId: string, user: User) {
    const board = await this.boardService.getOne(user, boardId);
    // return board.columns;
    // return board.columns;
    return board.columns.map((column) => {
      return {
        _id: column._id,
        title: column.title,
        order: column.order,
        createdAt: column.createdAt,
        updatedAt: column.updatedAt,
        cards: column.cards.map((card) => {
          return {
            _id: card._id,
            title: card.title,
            order: card.order,
            description: card.description,
            priority: card.priority,
            members: card.members,
            start: card.start,
            end: card.end,
            attachment: card.attachment,
            comments: card.comments,
            updatedAt: card.updatedAt,
            createdAt: card.createdAt,
            columnId: column._id,
          };
        }),
      };
    });
  }
  async addCardToColumn(columnId: string, cardId: string) {
    await this.columnModel.findByIdAndUpdate(columnId, {
      $addToSet: { cards: cardId },
    });
  }
  async removeCardToColumn(columnId: string, cardId: string) {
    await this.columnModel.findByIdAndUpdate(columnId, {
      $pull: { cards: cardId },
    });
  }
}
