import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: CreateProductDto, idUser: number) {
    const products = this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        qty: data.qty,
        user: {
          connect: { id: idUser }
        }
      }
    });
    return products;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.product.findUnique({ where: { id: id } });

    return user;
  }

  async update(id: number, data: CreateProductDto, idUser: number) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    const productBelongsUser = await this.prisma.user.findUnique({
      where: {
        id: Number(idUser),
      },
    });

    if(Number(productExists.userId) !== Number(idUser) && productBelongsUser.role === 'common'){
      throw new Error('propuct does not belongs to user!');
    }

    if (!productExists) {
      throw new Error('propuct does not exists!');
    }

    return await this.prisma.product.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async remove(id: number, idUser: number) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    const productBelongsUser = await this.prisma.user.findUnique({
      where: {
        id: Number(idUser),
      },
    });

    if(Number(productExists.userId) !== Number(idUser) && productBelongsUser.role === 'common'){
      throw new Error('propuct does not belongs to user!');
    }

    if (!productExists) {
      throw new Error('propuct does not exists!');
    }

    return await this.prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

  }
}
