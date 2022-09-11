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
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";

const BlockEditor = dynamic(() => import("@/components/roadmap/BlockEditor"), {
  ssr: false,
});

function CreateRoadmap() {
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
        <DragDropContext onDragEnd={() => null}>
          <BlockEditor />
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
