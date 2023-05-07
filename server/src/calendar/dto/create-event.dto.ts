import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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

  @IsBoolean()
  allDay: boolean;

  @IsString()
  desc: string;

  @IsArray()
  members: string[];
}
