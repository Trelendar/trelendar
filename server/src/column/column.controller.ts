import { User } from 'src/user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current.user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createColumnDto: CreateColumnDto,
    @CurrentUser() user: User,
  ) {
    return await this.columnService.create(createColumnDto, user);
  }

  @Get()
  findAll() {
    return this.columnService.findAll();
  }

  @Get(':boardId')
  @UseGuards(JwtAuthGuard)
  async getAllColumnByBoard(
    @Param('boardId') boardId: string,
    @CurrentUser() user: User,
  ) {
    return await this.columnService.getColumnForBoardId(boardId, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
    @CurrentUser() user: User,
  ) {
    return await this.columnService.update(id, updateColumnDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.columnService.remove(id, user);
  }
}
