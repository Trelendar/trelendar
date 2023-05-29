import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateRepeatDto {
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @IsNotEmpty()
  end: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  members: string[];

  @IsNotEmpty()
  type: string;
}
