import { Heading, Link, Text } from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";

import TypeTag from "../resource/TypeTag";

function ResourceBlock({ resource }: { resource: Resource }) {
  return (
    <>
      <TypeTag size="sm" type={resource.type} mb={2} />
      <NextLink href={`/resource/${resource.id}`} passHref>
        <Link>
          <Heading size="md" mb={2}>
            {resource.title}
          </Heading>
        </Link>
      </NextLink>
      <Text>{resource.description}</Text>
    </>
  );
}

export default ResourceBlock;
