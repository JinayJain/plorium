import { faker } from "@faker-js/faker";
import { PrismaClient, ResourceType } from "@prisma/client";

const prisma = new PrismaClient();

const NUM_USERS = 20;
const NUM_RESOURCES = 100;
const NUM_ROADMAPS = 100;

async function main() {
  const userIds = [];

  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(firstName, lastName),
        name: `${firstName} ${lastName}`,
        image: faker.image.avatar(),
        emailVerified: new Date(),
      },
    });

    userIds.push(user.id);
  }

  const resourceIds = [];

  for (let i = 0; i < NUM_RESOURCES; i++) {
    const resource = await prisma.resource.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        url: faker.internet.url(),
        type: faker.helpers.arrayElement(Object.values(ResourceType)),
        authorId: faker.helpers.arrayElement(userIds),
      },
    });

    resourceIds.push(resource.id);
  }

  for (let i = 0; i < NUM_ROADMAPS; i++) {
    const roadmap = await prisma.roadmap.create({
      data: {
        title: faker.company.name(),
        description: faker.random.words(
          faker.datatype.number({ min: 10, max: 20 }),
        ),
        authorId: faker.helpers.arrayElement(userIds),
      },
    });

    const numBlocks = faker.datatype.number({ min: 1, max: 10 });

    for (let j = 0; j < numBlocks; j++) {
      const blockType = faker.helpers.arrayElement(["resource", "note"]);

      switch (blockType) {
        case "resource":
          await prisma.resourceBlock.create({
            data: {
              block: {
                create: {
                  order: j,
                  roadmapId: roadmap.id,
                },
              },
              resource: {
                connect: {
                  id: faker.helpers.arrayElement(resourceIds),
                },
              },
            },
          });

          break;
        case "note":
          break;
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
