import { Box, BoxProps, Button, Link, Stack, Text } from "@chakra-ui/react";

const TableOfContents = ({
  resources,
  ...props
}: {
  resources: {
    id: string;
    title: string;
  }[];
} & BoxProps) => (
  <Box {...props}>
    <Text fontWeight="medium" size="sm" color="green.800" mb={2}>
      ROADMAP
    </Text>
    <Stack>
      {resources.map((resource, index) => (
        <Link
          key={index}
          as="a"
          variant="link"
          onClick={() => {
            document.getElementById(resource.id)?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {resource.title}
        </Link>
      ))}
    </Stack>
  </Box>
);

export default TableOfContents;
