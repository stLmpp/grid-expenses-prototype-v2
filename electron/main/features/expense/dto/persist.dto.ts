import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { PersistActionEnum } from '../../../../../lib/persist-action.enum';
import { ApiProperty } from '../../../api/api-property';
import { IsDate } from '../../../util/is-date';
import { IsNullable } from '../../../util/is-nullable';

export class PersistDto {
  @ApiProperty()
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiProperty({ isEnum: true, type: () => PersistActionEnum })
  @IsDefined()
  @IsEnum(PersistActionEnum)
  action!: PersistActionEnum;

  @ApiProperty()
  @IsDefined()
  @IsDate()
  date!: Date;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsDefined()
  @IsObject()
  people!: Record<string, number | null | undefined>;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Max(9999)
  @Min(0)
  year!: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Max(12)
  @Min(1)
  month!: number;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  otherCard!: boolean;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  order!: number;

  @ApiProperty({ optional: true, type: () => Boolean })
  @IsOptional()
  @IsBoolean()
  @IsNullable()
  isFirstInstallment?: boolean | null;

  @ApiProperty({ optional: true, type: () => String })
  @IsOptional()
  @IsString()
  @IsNullable()
  installmentId?: string | null;

  @ApiProperty({ optional: true, type: () => Number })
  @IsOptional()
  @IsNumber()
  @IsNullable()
  installmentQuantity?: number | null;

  @ApiProperty({ optional: true, type: () => Number })
  @IsOptional()
  @IsNumber()
  @IsNullable()
  installment?: number | null;
}
