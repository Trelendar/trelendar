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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser() user: User,
  ) {
    return await this.boardService.create(user._id, createBoardDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: User) {
    return await this.boardService.getAllBoard(user._id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.boardService.getOne(user, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id/removeMember')
  removeOne(@Param('id') id: string, @Body() data: { idRemove: string }) {
    return this.boardService.removeOne(id, data.idRemove);
  }
  @Post(':id/addMember')
  addOne(@Param('id') id: string, @Body() data: { idAdded: string }) {
    return this.boardService.addOne(id, data.idAdded);
  }

  @Get(':id/invite')
  @UseGuards(JwtAuthGuard)
  createInviteLink(@Param('id') id: string, @CurrentUser() user: User) {
    const token = this.jwtService.sign({
      invite: true,
      boardId: id,
      name: user.name,
    });
    return `https://example.com/invite?token=${token}`;
  }
}
