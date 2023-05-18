import { ObjectId } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class DeleteEventDto {
  @IsNotEmpty()
  eventId: string;
}
