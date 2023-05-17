import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CalendarModule } from './calendar/calendar.module';
import { CardModule } from './card/card.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { DbModule } from './database/db.provider';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    DbModule,
    BoardModule,
    ColumnModule,
    CardModule,
    CommentModule,
    CloudinaryModule,
    CalendarModule,
    MailModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
