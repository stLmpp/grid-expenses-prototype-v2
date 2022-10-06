import { IsDefined, IsUUID } from 'class-validator';

export class PersistDto {
  @IsDefined()
  @IsUUID()
  id!: string;
}
