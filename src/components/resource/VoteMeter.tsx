import { Box, BoxProps, Icon, Text } from "@chakra-ui/react";
import { FaChevronUp } from "react-icons/fa";

function VoteMeter({
  votes,
  ...props
}: {
  votes: number;
} & BoxProps) {
  return (
    <Box fontSize="sm" color="gray.500" textAlign="center" {...props}>
      <Icon as={FaChevronUp} />
      <Text>{votes}</Text>
    </Box>
  );
}

export default VoteMeter;
