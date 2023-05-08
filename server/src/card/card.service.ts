import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './entities/card.entity';
import { BoardService } from 'src/board/board.service';
import { Model, Schema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { ColumnService } from 'src/column/column.service';
import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from 'src/error';
import { convertToObjectId } from 'src/util';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
  ) {}
  async create(createCardDto: CreateCardDto, user: User) {
    const { columnId, title, order } = createCardDto;
    await this.boardService.findByColumn(columnId, user);
    const card = await new this.cardModel({
      title,
      order,
    }).save();
    await this.columnService.addCardToColumn(columnId, card.id);

    return card;
  }

  findAll() {
    return `This action returns all card`;
  }

  async findOne(id: string, user: User) {
    const column = await this.columnService.getColumnForCardId(id);
    if (!column) return;
    const board = await this.boardService.findByColumn(
      column._id.toString(),
      user,
    );
    if (!board) return;
    const card = await this.cardModel.findById(id).populate({
      path: 'members',
      model: 'User',
    });
    console.log(
      '🚀 ~ file: card.service.ts:45 ~ CardService ~ findOne ~ card:',
      card,
    );
    return card;
    return `This action returns a #${id} card`;
  }

  async update(id: string, updateCardDto: UpdateCardDto, user: User) {
    const { oldColumnId, columnId } = updateCardDto;
    if (!oldColumnId || !columnId) return;
    await this.boardService.findByColumn(oldColumnId, user);
    const card = await this.cardModel.findByIdAndUpdate(id, {
      ...updateCardDto,
    });
    if (!card) return;
    if (oldColumnId !== columnId) {
      await this.columnService.addCardToColumn(columnId, String(card._id));
      await this.columnService.removeCardToColumn(
        oldColumnId,
        String(card._id),
      );
    }
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }

  async assignMember(id: string, assignIds: string[], user: User) {
    const column = await this.columnService.getColumnForCardId(id);
    if (!column) return;
    const board = await this.boardService.findByColumn(
      column._id.toString(),
      user,
    );
    if (!board) return;

    // const assignNotFound = await this.boardService.checkExitUserForBoard(
    //   assignIds.map((id) => convertToObjectId(id)),
    //   board.id,
    // );
    // if (!assignNotFound) throw new BadRequestException();
    return this.cardModel
      .findByIdAndUpdate(
        id,
        {
          members: assignIds.map((id) => convertToObjectId(id)),
        },
        { new: true },
      )
      .exec();
  }
}
