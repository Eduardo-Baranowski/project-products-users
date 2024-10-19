import { $Enums } from '@prisma/client';

export class CreateUserDto {
  cpf: string;
  password: string;
  role: $Enums.Role;
  name: string;
  username: string;
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
