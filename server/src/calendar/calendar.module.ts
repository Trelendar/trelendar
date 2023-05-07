import { MongooseModule } from '@nestjs/mongoose';
import { CanlendarController } from './calendar.controller';
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { EventSchema } from './entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CanlendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
