import { BoardModule } from './../board/board.module';
import { UserModule } from './../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CanlendarController } from './calendar.controller';
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { EventSchema, Event } from './entities/event.entity';

@Module({
  imports: [
    UserModule,
    BoardModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CanlendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
