import { faker } from "@faker-js/faker";
import { PrismaClient, ResourceType } from "@prisma/client";

const prisma = new PrismaClient();

const NUM_USERS = 20;
const NUM_RESOURCES = 100;
const NUM_ROADMAPS = 100;

async function main() {
  const userIds = [];

  console.log("Creating users...");
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

  console.log("Creating resources...");
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

    const numVotes = faker.datatype.number({ min: 0, max: 20 });

    for (let j = 0; j < numVotes; j++) {
      const userId = faker.helpers.arrayElement(userIds);
      await prisma.resourceVote.upsert({
        where: {
          resourceId_userId: {
            resourceId: resource.id,
            userId,
          },
        },
        create: {
          resourceId: resource.id,
          userId,
        },
        update: {},
      });
    }

    resourceIds.push(resource.id);
  }

  console.log("Creating roadmaps...");
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

    const numLearners = faker.datatype.number({ min: 0, max: 20 });

    for (let j = 0; j < numLearners; j++) {
      const userId = faker.helpers.arrayElement(userIds);
      await prisma.roadmapLearner.upsert({
        create: {
          roadmapId: roadmap.id,
          userId,
        },
        update: {},
        where: {
          roadmapId_userId: {
            roadmapId: roadmap.id,
            userId,
          },
        },
      });
    }

    const numBlocks = faker.datatype.number({ min: 1, max: 10 });

    for (let j = 0; j < numBlocks; j++) {
      const blockType = faker.helpers.arrayElement(["resource", "note"]);

      switch (blockType) {
        case "resource":
          await prisma.resourceBlock.create({
            data: {
              block: {
                create: {
                  kind: "RESOURCE",
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
          await prisma.noteBlock.create({
            data: {
              block: {
                create: {
                  kind: "NOTE",
                  order: j,
                  roadmapId: roadmap.id,
                },
              },
              title: faker.datatype.boolean() ? faker.company.bs() : null,
              content: faker.random.words(
                faker.datatype.number({ min: 10, max: 20 }),
              ),
            },
          });
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
