import { Box, Flex, Heading } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Box
      h={16}
      w="full"
      bg="green.800"
      color="white"
      as="nav"
      borderBottom="solid 1px"
      borderColor="gray.200"
      px={4}
    >
      <Flex m="auto" maxW="1400px" align="center" h="full">
        <Heading size="lg">Plorium</Heading>
      </Flex>
    </Box>
  );
};

export default Nav;
