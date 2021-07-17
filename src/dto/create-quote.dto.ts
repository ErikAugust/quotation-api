import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  readonly quote: string;

  @IsString()
  readonly attributed?: string;

  @IsString()
  @IsOptional()
  readonly source?: string;

  @IsString()
  @IsOptional()
  readonly url?: string;

  @IsNumber()
  @IsOptional()
  readonly year?: number;

  @IsString({ each: true })
  tags?: string[];
}
