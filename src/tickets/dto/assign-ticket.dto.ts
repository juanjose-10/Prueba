import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AssignTicketDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  assignedTo!: string;
}