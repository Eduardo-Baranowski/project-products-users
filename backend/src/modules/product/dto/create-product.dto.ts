import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição',
  })
  description: string;

  @ApiProperty({
    description: 'Preço',
  })
  price: number;

  @ApiProperty({
    description: 'Quantidade',
  })
  qty: number;
}
