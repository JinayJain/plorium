import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const NAV_HEIGHT = "64px";

const NAV_ITEMS = [
  {
    label: "Roadmaps",
    href: "/roadmap",
  },
  {
    label: "Create",
    href: "/create",
  },
];

const Nav = () => {
  return (
    <Box
      as="nav"
      h={NAV_HEIGHT}
      w="full"
      bg="green.800"
      color="white"
      borderBottom="solid 8px"
      borderColor="green.200"
      pos="sticky"
      top={0}
      zIndex={1}
      px={4}
    >
      <Flex m="auto" maxW="1400px" align="center" h="full">
        <NextLink href="/" passHref>
          <Link
            _hover={{
              textDecor: "none",
            }}
          >
            <Heading size="lg">Plorium</Heading>
          </Link>
        </NextLink>
        <HStack spacing={4} ml={8}>
          {NAV_ITEMS.map((item) => (
            <NextLink key={item.label} href={item.href} passHref>
              <Link>{item.label}</Link>
            </NextLink>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Nav;
