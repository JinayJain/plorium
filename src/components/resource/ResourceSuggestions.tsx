import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";

import useDebounce from "@/util/hooks/useDebounce";
import { trpc } from "@/util/trpc";

const ResourceSuggestions = ({
  query,
  onSelect,
}: {
  query: string;
  onSelect: (resource: Resource) => void;
}) => {
  const debouncedQuery = useDebounce(query, 500);
  const { data: suggestions, isLoading } = trpc.useQuery([
    "resource.suggestions",
    debouncedQuery,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack spacing={4}>
      {suggestions &&
        suggestions.map((suggestion) => (
          <Flex key={suggestion.id}>
            <Box flex={1}>
              <Heading size="sm">{suggestion.name}</Heading>
              <Link
                href={suggestion.url}
                isExternal
                fontSize="sm"
                color="gray.500"
              >
                {suggestion.url}
              </Link>
            </Box>

            <Button
              colorScheme="green"
              size="sm"
              variant="outline"
              onClick={() => onSelect(suggestion)}
            >
              Select
            </Button>
          </Flex>
        ))}
    </Stack>
  );
};

export default ResourceSuggestions;
