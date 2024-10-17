import { Role } from '@prisma/client';
import { prisma } from '../src/database';
import * as bcrypt from 'bcrypt';

const run = async (): Promise<void> => {
  const user = [
    {
      id: 1,
      cpf: 'admin-master',
      password: '123456789@',
      role: Role,
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
            cpf: use.cpf,
            password: await bcrypt.hash(use.password, 10),
            role: 'admin',
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
