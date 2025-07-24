import { PrismaClient } from '../generated/prisma/client.ts';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.profile.create({
    data: {
      name: 'Omare',
      email: 'omare@prisma.io',
    },
  });
  console.log(user);

  const users = await prisma.profile.findMany();
  console.log(users);
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
