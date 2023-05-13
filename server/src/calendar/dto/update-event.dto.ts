import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  start: string;

  @IsString()
  @IsNotEmpty()
  end: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsBoolean()
  @IsNotEmpty()
  allDay: Date;

  @IsArray()
  @IsNotEmpty()
  members: string[];
}
