import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

async function main() {
  try {
    if (
      !(await prisma.role.findUnique({
        where: {
          name: "job seeker",
        },
      }))
    ) {
      await prisma.role.create({
        data: {
          name: "job seeker",
        },
      });
    }
    if (
      !(await prisma.role.findUnique({
        where: {
          name: "company",
        },
      }))
    ) {
      await prisma.role.create({
        data: {
          name: "company",
        },
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

main();
