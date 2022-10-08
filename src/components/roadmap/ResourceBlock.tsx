import { Heading, Link, LinkOverlay, Text } from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";

import TypeTag from "../resource/TypeTag";

function ResourceBlock({ resource }: { resource: Resource }) {
  return (
    <>
      <TypeTag size="sm" type={resource.type} mb={2} />
      <NextLink href={`/resource/${resource.id}`} passHref>
        <LinkOverlay>
          <Heading size="md" mb={2}>
            {resource.title}
          </Heading>
        </LinkOverlay>
      </NextLink>
      <Text>{resource.description}</Text>
    </>
  );
}

export default ResourceBlock;
