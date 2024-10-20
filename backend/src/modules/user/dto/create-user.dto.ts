import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'CPF',
  })
  cpf: string;

  @ApiProperty({
    description: 'Senha',
  })
  password: string;

  @ApiProperty({
    description: 'Tipo de usuário',
  })
  role: $Enums.Role;

  @ApiProperty({
    description: 'Nome completo',
  })
  name: string;

  @ApiProperty({
    description: 'Nome de usuário',
  })
  username: string;

  @ApiProperty({
    description: 'Email',
  })
  email: string;
}

export class UserDto {
  id: number;
  cpf: string;
  password: string;
  role: $Enums.Role;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FileDto = {
  buffer: Buffer;
  filename: string;
  mimetype: string;
  originalname: string;
  size: number;
};
