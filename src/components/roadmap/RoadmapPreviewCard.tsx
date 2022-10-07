import {
  Box,
  Divider,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { Roadmap } from "@prisma/client";
import NextLink from "next/link";

import pluralize from "@/util/functions/pluralize";

function RoadmapPreviewCard({
  roadmap,
}: {
  roadmap: Roadmap & {
    _count: {
      learners: number;
      blocks: number;
    };
  };
}) {
  return (
    <LinkBox
      display="flex"
      flexDir="column"
      key={roadmap.id}
      borderWidth={1}
      rounded="md"
      _hover={{
        borderColor: "gray.400",
      }}
    >
      <Box p={4}>
        <NextLink href={`/roadmap/${roadmap.id}`} passHref>
          <LinkOverlay>
            <Heading size="md">{roadmap.title}</Heading>
          </LinkOverlay>
        </NextLink>
        <Text fontSize="sm" color="gray.500" mt="auto" pt={2}>
          {pluralize(roadmap._count.learners, "learner")} ·{" "}
          {pluralize(roadmap._count.blocks, "resource")}
        </Text>

        <Text fontSize="sm" color="gray.500"></Text>
      </Box>

      <Divider />

      <Box p={4} bg="gray.100" flex="1" roundedBottom="md">
        <Text color="gray" fontSize="sm" lineHeight="short">
          {roadmap.description}
        </Text>
      </Box>
    </LinkBox>
  );
}

export default RoadmapPreviewCard;
