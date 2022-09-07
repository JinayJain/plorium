import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";

const Steps = dynamic(() => import("@/components/roadmap/Steps"), {
  ssr: false,
});

function CreateRoadmap() {
  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
  }, []);

  return (
    <Layout>
      <Heading>Create Roadmap</Heading>

      <form noValidate>
        <Stack>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea />
          </FormControl>
        </Stack>

        <Heading size="lg">Steps</Heading>
        <DragDropContext onDragEnd={onDragEnd}>
          <Steps />
        </DragDropContext>
      </form>
    </Layout>
  );
}

export async function getServerSideProps() {
  resetServerContext();

  return {
    props: {},
  };
}

export default CreateRoadmap;
