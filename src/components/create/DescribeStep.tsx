import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { AnimatePresence } from "framer-motion";

interface DescribeValues {
  title: string;
  description: string;
}

const DescribeStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <Stack spacing={4}>
      <Heading alignSelf="center">Describe your roadmap</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" placeholder="Title" />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Describe your roadmap" h={100} />
      </FormControl>
      <Button alignSelf="flex-end" onClick={onNext} colorScheme="green">
        Continue
      </Button>
    </Stack>
  );
};

export default DescribeStep;
