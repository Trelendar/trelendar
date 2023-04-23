import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsString()
  @IsNotEmpty()
  oldColumnId: string;
  @IsString()
  @IsOptional()
  description?: string;
}
