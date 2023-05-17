import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './entities/board.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    JwtModule.register({
      secret: process.env.JWT_KEY_INVITE || 'my_key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
