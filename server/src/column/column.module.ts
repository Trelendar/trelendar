import { BoardModule } from './../board/board.module';
import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './entities/column.entity';

@Module({
  imports: [
    BoardModule,
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
