import { ApiProperty } from '@nestjs/swagger';

export class IRequestLoginUser {
  @ApiProperty({
    description: 'CPF',
  })
  cpf: string;

  @ApiProperty({
    description: 'password',
  })
  password: string;
}

export interface IRequestLoginUserPayload {
  id: number;
  cpf: string;
  password: string;
}

export interface IRequestUploadPhotoUser {
  id: string;
}
