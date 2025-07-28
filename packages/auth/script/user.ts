import { PrismaClient } from '../generated/prisma/client.ts';
import { drizzle } from 'drizzle-orm/prisma/sqlite';
import { User } from '../../../packages/auth/drizzle/schema';

const prisma = new PrismaClient().$extends(drizzle());

async function main() {
  const user = await prisma.profile.create({
    data: {
      name: 'Jimoh',
      email: 'jimoh@prisma.io',
    },
  });
  console.log(user);

  const users = await prisma.profile.findMany();
  console.log(users);

  const drizzle = await prisma.$drizzle.run(`
    SELECT * FROM "Profile";
  `);
  console.log(drizzle);
  const drizzleUsers = await prisma.$drizzle.run('SELECT * FROM "Profile"');
  console.log(drizzleUsers);
  const drizzleUser = await prisma.$drizzle.run(
    `SELECT * FROM "Profile" WHERE id = ${User.id}`
  );
  console.log(drizzleUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
