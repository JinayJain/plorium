import { Box, Flex, Heading } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      h="300px"
      bg="green.800"
      color="white"
      borderTop="solid 8px"
      borderColor="green.200"
    >
      <Box>
        <Heading>Plorium</Heading>
      </Box>
    </Flex>
  );
};

export default Footer;
