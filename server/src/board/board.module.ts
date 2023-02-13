import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './entities/board.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
