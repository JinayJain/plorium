import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";

const RoadmapEditor = dynamic(
  () => import("@/components/roadmap/RoadmapEditor"),
  {
    ssr: false,
  },
);

export type ResourceBlockData = Pick<
  Resource,
  "name" | "description" | "url" | "type"
> & {
  id: string;
};

function Blocks() {
  const [blocks, setBlocks] = useState<ResourceBlockData[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const onCreate = (block: ResourceBlockData, index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, block);
    setBlocks(newBlocks);
  };

  const onEdit = (block: ResourceBlockData, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = block;
    setBlocks(newBlocks);
  };

  const onDelete = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  return (
    <Box>
      <Heading size="lg">Steps</Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <RoadmapEditor
          blocks={blocks}
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </DragDropContext>
    </Box>
  );
}

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
      </form>

      <Blocks />
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
