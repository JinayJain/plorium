import { Box, Flex, Heading, Link, LinkOverlay, Text } from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";

import TypeTag from "../resource/TypeTag";
import VoteMeter from "../resource/VoteMeter";

function ResourceBlock({
  resource,
}: {
  resource: Resource & { _count: { votes: number } };
}) {
  return (
    <>
      <Flex>
        <Box flex={1}>
          <TypeTag size="sm" type={resource.type} mb={2} />
          <NextLink href={`/resource/${resource.id}`} passHref>
            <LinkOverlay>
              <Heading size="md" mb={2}>
                {resource.title}
              </Heading>
            </LinkOverlay>
          </NextLink>
          <Text>{resource.description}</Text>
        </Box>

        <VoteMeter
          votes={resource._count.votes}
          fontSize="md"
          alignSelf="center"
        />
      </Flex>
    </>
  );
}

export default ResourceBlock;
