import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";
import { FaChevronUp } from "react-icons/fa";

import TypeTag from "./TypeTag";
import VoteMeter from "./VoteMeter";

function ResourcePreviewCard({
  resource,
}: {
  resource: Resource & { _count: { votes: number } };
}) {
  return (
    <LinkBox
      as={Stack}
      p={4}
      borderWidth={1}
      rounded="md"
      _hover={{
        borderColor: "gray.400",
      }}
    >
      <Flex>
        <Box flex={1}>
          <TypeTag type={resource.type} alignSelf="flex-start" size="sm" />

          <NextLink href={`/resource/${resource.id}`} passHref>
            <LinkOverlay>
              <Heading size="md">{resource.title}</Heading>
            </LinkOverlay>
          </NextLink>

          <Link href={resource.url} isExternal>
            <Text fontSize="sm" color="gray.500">
              {resource.url}
            </Text>
          </Link>
        </Box>

        <VoteMeter votes={resource._count.votes} />
      </Flex>
    </LinkBox>
  );
}

export default ResourcePreviewCard;
