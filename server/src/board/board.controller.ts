import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InviteBoardDto } from './dto/invite-board.dto';
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: User) {
    return await this.boardService.getAllBoard(user._id);
  }

  @Get('invite')
  async validateLinkInvite(
    @Param('id') id: string,
    @Query() { token }: { token: string },
  ) {
    const { boardId, name: inviterName } = this.jwtService.verify(token);

    const board = await this.boardService.getById(boardId);
    return {
      member: board.members.length,
      inviteBy: inviterName,
      name: board.name,
    };
  }
  @Post('join')
  @UseGuards(JwtAuthGuard)
  async joinBoard(
    @Query() { token }: { token: string },
    @CurrentUser() user: User,
  ) {
    const { boardId, name: inviterName } = this.jwtService.verify(token);
    return await this.boardService.addMemberToBoard(boardId, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser() user: User,
  ) {
    return await this.boardService.create(user._id, createBoardDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.boardService.getOne(user, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @CurrentUser() user: User,
  ) {
    return this.boardService.update(id, updateBoardDto, user);
  }

  @Delete(':id/removeMember')
  removeOne(@Param('id') id: string, @Body() data: { idRemove: string }) {
    return this.boardService.removeOne(id, data.idRemove);
  }
  @Post(':id/addMember')
  addOne(@Param('id') id: string, @Body() data: { idAdded: string }) {
    return this.boardService.addOne(id, data.idAdded);
  }

  @Get(':id/create-link-invite')
  @UseGuards(JwtAuthGuard)
  async createInviteLink(@Param('id') id: string, @CurrentUser() user: User) {
    await this.boardService.getOne(user, id);
    const token = this.jwtService.sign({
      invite: true,
      boardId: id,
      inviterId: user._id,
      name: user.name,
    });
    return `${process.env.URL_FE}/invite?token=${token}`;
  }
  @Post(':id/send-mail-invite')
  @UseGuards(JwtAuthGuard)
  async sendMaile(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() { mail, link }: { mail: string; link: string },
  ) {
    return await this.boardService.sendMailInvite(mail, link);
  }

  @Get(':id/members')
  @UseGuards(JwtAuthGuard)
  async getMemberForBoard(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.boardService.getMember(id, user);
  }
}
