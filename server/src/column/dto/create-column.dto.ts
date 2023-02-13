import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  boardId: string;
}
