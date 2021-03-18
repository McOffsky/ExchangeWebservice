import { IsNotEmpty, IsNumber, IsString, IsAlpha } from 'class-validator';
import { Type } from 'class-transformer';

export class ExchangeQuery {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  sourceCurrency: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  targetCurrency: string;
}
