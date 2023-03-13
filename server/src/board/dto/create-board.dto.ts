import { IsOptional } from 'class-validator';

export class CreateBoardDto {
  name: string;
  @IsOptional()
  members: string[];
  @IsOptional()
  background: string;
}
