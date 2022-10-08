import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";

import { trpc } from "@/util/trpc";

function Suggestions({
  query,
  onSelect,
}: {
  query: string;
  onSelect: (resource: Resource) => void;
}) {
  const { data } = trpc.useQuery([
    "resource.suggestions",
    {
      query,
    },
  ]);

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Suggestions
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>

        <AccordionPanel>
          <Stack spacing={4}>
            {data &&
              data.map((resource) => (
                <Flex key={resource.id}>
                  <Box flex="1">
                    <NextLink href={`/resource/${resource.id}`} passHref>
                      <Link target="_blank">
                        <Heading size="sm">{resource.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>{resource.url}</Text>
                  </Box>

                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => onSelect(resource)}
                    size="sm"
                  >
                    Select
                  </Button>
                </Flex>
              ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default Suggestions;
