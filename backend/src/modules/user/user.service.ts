import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, FileDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as fs from 'fs';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { cpf: data.cpf },
    });

    if (user) {
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);
    }
    const { password } = data;

    data.password = await bcrypt.hash(password, 10);
    const users = this.prisma.user.create({ data });
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

  async updatePhoto(image: FileDto, id: number): Promise<User> {
    if (!id) {
      throw new HttpException('Data missing', HttpStatus.BAD_REQUEST);
    }

    const folder = `imagens`;
    const publicFolderProd = `${__dirname}/../../../../public/${folder}`;
    const publicFolderDev = `public/${folder}`;

    const isDevelopment = process.env.ENVIRONMENT === 'developer';
    const publicFolder = isDevelopment ? publicFolderDev : publicFolderProd;

    if (!fs.existsSync(publicFolder)) {
      await fs.promises.mkdir(publicFolder, { recursive: true });
    }

    const user = await this.prisma.user.findFirst({
      where: { id: Number(id) },
    });

    let destiny_image = null;

    try {
      if (!!image) {
        if (user.avatar) {
          const existingImage = user.avatar;
          if (fs.existsSync('public/' + existingImage)) {
            fs.unlinkSync('public/' + existingImage);
          }
        }
        const microtime = new Date().getTime();
        const extension = image.originalname.split('.');
        const hash = md5(microtime.toString());
        const new_name = `${hash}.${extension[extension.length - 1]}`;
        const destiny_logo = `${publicFolder}/${new_name}`;

        fs.writeFileSync(destiny_logo, image.buffer);
        destiny_image = `${folder}/${new_name}`;
      } else {
        destiny_image = user.avatar;
      }
    } catch (err) {
      console.log({ err });
    }

    await this.prisma.user.update({
      data: {
        avatar: destiny_image,
      },
      where: {
        id: Number(id),
      },
    });
    return this.prisma.user.findFirst({ where: { id: Number(id) } });
  }

  async update(id: number, data: CreateUserDto, idUser: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    const userIsUser = await this.prisma.user.findUnique({
      where: {
        id: Number(idUser),
      },
    });

    if (userIsUser.role !== 'admin') {
      throw new HttpException('Usuário não é admin', HttpStatus.BAD_REQUEST);
    }

    if (!userExists) {
      throw new Error('propuct does not exists!');
    }

    return await this.prisma.user.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }
}
