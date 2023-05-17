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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCardDto: CreateCardDto,
    @CurrentUser() user: User,
  ) {
    return await this.cardService.create(createCardDto, user);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.cardService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @CurrentUser() user: User,
  ) {
    return await this.cardService.update(id, updateCardDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.cardService.remove(id, user);
  }

  @Patch(':id/assign')
  @UseGuards(JwtAuthGuard)
  async assignMember(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() { assignIds }: { assignIds: string[] },
  ) {
    return await this.cardService.assignMember(id, assignIds, user);
  }
}
