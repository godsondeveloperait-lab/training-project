import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: number;

  @IsString()
  stock: number;

  @IsOptional()
  images?: string[];
}
