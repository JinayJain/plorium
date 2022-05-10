import {
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

const DescribeStep = () => {
  return (
    <AnimatePresence>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={console.log}
      >
        <Flex flexDir="column">
          <Heading m="auto">Describe your roadmap</Heading>
          <Stack as="form" flexDir="column" spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" placeholder="Title" />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Describe your roadmap in a few sentences" />
            </FormControl>
          </Stack>
        </Flex>
      </Formik>
    </AnimatePresence>
  );
};

export default DescribeStep;
