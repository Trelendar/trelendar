import { IsOptional, IsString } from 'class-validator';

export class InviteBoardDto {
  @IsString()
  token: string;
}
