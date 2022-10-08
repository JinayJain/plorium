import { Flex, Heading } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      as="footer"
      borderTopWidth={1}
      align="center"
      justify="center"
      py={8}
      bg="gray.50"
    >
      <Heading size="lg">Plorium</Heading>
    </Flex>
  );
}

export default Footer;
