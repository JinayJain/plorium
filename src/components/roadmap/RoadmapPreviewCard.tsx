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
import React from "react";

import pluralize from "@/util/functions/pluralize";

function RoadmapPreviewCard({
  roadmap,
}: {
  roadmap: Roadmap & {
    _count?: {
      learners?: number;
      blocks?: number;
    };
  };
}) {
  const stats = [
    {
      label: "learner",
      value: roadmap._count?.learners,
    },
    {
      label: "resource",
      value: roadmap._count?.blocks,
    },
  ];
  const filteredStats = stats.filter(
    (
      stat,
    ): stat is {
      label: string;
      value: number;
    } => stat.value !== undefined,
  );

  return (
    <LinkBox
      display="flex"
      flexDir="column"
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
          {filteredStats
            .map((stat) => pluralize(stat.value, stat.label))
            .join(" · ")}
        </Text>
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
