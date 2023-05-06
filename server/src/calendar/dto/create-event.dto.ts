import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @IsNotEmpty()
  end: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  allDay: boolean;

  @IsString()
  desc: string;

  @IsArray()
  members: string[];
}
