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
  createdAt: Date;
  updatedAt: Date;
}
