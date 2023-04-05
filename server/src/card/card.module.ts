import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';
import { BoardService } from 'src/board/board.service';
import { ColumnService } from 'src/column/column.service';
import { ColumnModule } from 'src/column/column.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    BoardModule,
    ColumnModule,
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
