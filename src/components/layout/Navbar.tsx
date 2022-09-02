import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const NAV_LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Roadmap",
    href: "/roadmap",
  },
  {
    name: "About",
    href: "/about",
  },
];

function Navbar() {
  return (
    <Flex>
      <Heading size="lg">Plorium</Heading>

      <HStack spacing={4} align="center">
        {NAV_LINKS.map((link) => (
          <NextLink href={link.href} key={link.name} passHref>
            <Link>{link.name}</Link>
          </NextLink>
        ))}
      </HStack>
    </Flex>
  );
}

export default Navbar;
