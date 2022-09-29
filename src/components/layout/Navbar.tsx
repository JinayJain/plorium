import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import {
  FaGlobe,
  FaHammer,
  FaRoad,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const NAV_LINKS = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Roadmaps",
    href: "/roadmap",
  },
  {
    name: "Resources",
    href: "/resource",
  },
  {
    name: "About",
    href: "/about",
  },
];

function ProfileMenu({
  user,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <Menu>
      <MenuButton
        as={Box}
        _hover={{
          cursor: "pointer",
          bg: "gray.100",
        }}
        px={4}
        py={2}
        borderRadius={8}
      >
        <HStack spacing={2}>
          <Avatar src={user.image ?? ""} name={user.name ?? ""} size="sm" />
          <Text>{user.name}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <NextLink href="/me">
          <MenuItem icon={<FaUser />}>Profile</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut()}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function CreateMenu() {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<SmallAddIcon />}
        colorScheme="green"
        variant="outline"
      >
        Create
      </MenuButton>
      <MenuList>
        <NextLink href="/roadmap/create">
          <MenuItem icon={<FaRoad />}>Roadmap</MenuItem>
        </NextLink>
        <NextLink href="/resource/create">
          <MenuItem icon={<FaGlobe />}>Resource</MenuItem>
        </NextLink>
        <NextLink href="/project/create">
          <MenuItem icon={<FaHammer />}>Project</MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  );
}

function Navbar() {
  const { status, data: session } = useSession();

  return (
    <Flex as="nav" w="full" borderBottomWidth={1} h="64px" align="center">
      <Container maxW="container.xl">
        <Flex align="center">
          <NextLink href="/" passHref>
            <Link as={Heading} size="lg">
              Plorium
            </Link>
          </NextLink>

          <HStack spacing={4} align="center" ml={8}>
            {NAV_LINKS.map((link) => (
              <NextLink href={link.href} key={link.name} passHref>
                <Link>{link.name}</Link>
              </NextLink>
            ))}
          </HStack>

          <HStack ml="auto" spacing={4} align="center">
            {status === "loading" ? (
              <Spinner size="sm" />
            ) : status === "unauthenticated" || !session?.user ? (
              <Button
                leftIcon={<FcGoogle />}
                onClick={() => signIn("google")}
                variant="outline"
              >
                Sign in with Google
              </Button>
            ) : (
              <HStack spacing={4}>
                <CreateMenu />
                <ProfileMenu user={session.user} />
              </HStack>
            )}
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
