import { Role } from '@prisma/client';
import { prisma } from '../src/database';
import * as bcrypt from 'bcrypt';

const run = async (): Promise<void> => {
  const user = [
    {
      id: 1,
      username: 'admin-master',
      name: 'admin-master',
      cpf: 'admin-master',
      password: '123456789@',
      role: Role,
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Rog Phone 7',
      description: 'Rog Phone',
      userId: 1,
      qty: 8,
      price: 7500.0,
    },
    {
      id: 2,
      name: 'Motorola Moto G75',
      description: 'Motorola Moto G75',
      userId: 1,
      qty: 4,
      price: 2069,
    },
    {
      id: 3,
      name: 'Sansung Galaxy S24 FE',
      description: 'Sansung Galaxy S24 FE',
      userId: 1,
      qty: 8,
      price: 4999,
    },
    {
      id: 4,
      name: 'XIAOMI 14T',
      description: 'XIAOMI 14T',
      userId: 1,
      qty: 8,
      price: 5999,
    },
    {
      id: 5,
      name: 'Iphone 16 Pro',
      description: 'Iphone 16 Pro',
      userId: 1,
      qty: 8,
      price: 8699,
    },
    {
      id: 6,
      name: 'Iphone 16 Pro Max',
      description: 'Iphone 16 Pro Max',
      userId: 1,
      qty: 1,
      price: 10556,
    },
    {
      id: 7,
      name: 'Iphone 16 Plus',
      description: 'Iphone 16 Plus',
      userId: 1,
      qty: 2,
      price: 8121,
    },
    {
      id: 8,
      name: 'Iphone 16',
      description: 'Iphone 16',
      userId: 1,
      qty: 8,
      price: 6809,
    },
    {
      id: 9,
      name: 'Redmi 14c',
      description: 'Redmi 14c',
      userId: 1,
      qty: 15,
      price: 799,
    },
    {
      id: 10,
      name: 'Motorola Edge 50 Neo',
      description: 'Motorola Edge 50 Neo',
      userId: 1,
      qty: 8,
      price: 2699,
    },
    {
      id: 11,
      name: 'Rog Phone 5s',
      description: 'Rog Phone 5s',
      userId: 1,
      qty: 8,
      price: 3000,
    },
    {
      id: 12,
      name: 'Rog Phone 6',
      description: 'Rog Phone 6',
      userId: 1,
      qty: 8,
      price: 4500.0,
    },
    {
      id: 13,
      name: 'Rog Phone 8',
      description: 'Rog Phone 8',
      userId: 1,
      qty: 8,
      price: 7700.0,
    },
  ];

  await prisma.$transaction(async (trx) => {
    await Promise.all(
      user.map(async (use) => {
        await trx.user.upsert({
          where: { id: use.id },
          update: {},
          create: {
            id: use.id,
            username: use.username,
            name: use.name,
            cpf: use.name,
            password: await bcrypt.hash(use.password, 10),
            role: 'admin',
          },
        });
      }),
    );
  });

  await prisma.$transaction(async (trx) => {
    await Promise.all(
      products.map(async (product) => {
        await trx.product.upsert({
          where: { id: product.id },
          update: {},
          create: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            qty: product.qty,
            userId: product.userId,
          },
        });
      }),
    );
  });
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
