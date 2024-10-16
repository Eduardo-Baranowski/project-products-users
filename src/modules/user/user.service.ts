import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { cpf: data.cpf },
    });

    if (user) {
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);
    }
    const { password } = data;

    data.password = await bcrypt.hash(password, 10);
    const users = this.prisma.user.create({data});
    return users;
  }


  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    delete user.password;

    return user;
  }


  async login(cpf: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { cpf: cpf },
    });



    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        'Login/password invalids',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.password;

    return user;
  }
}
