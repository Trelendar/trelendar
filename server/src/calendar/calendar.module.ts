import { CanlendarController } from './calendar.controller';
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Module({
  controllers: [CanlendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
