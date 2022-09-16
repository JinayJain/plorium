import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";
import { useCreateResourceForm } from "@/util/forms/create-resource";

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
  existing: boolean;
};

function Blocks({
  blocks,
  setBlocks,
}: {
  blocks: ResourceBlockData[];
  setBlocks: Dispatch<SetStateAction<ResourceBlockData[]>>;
}) {
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
  const [blocks, setBlocks] = useState<ResourceBlockData[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useCreateResourceForm();

  return (
    <Layout>
      <Heading>Create Roadmap</Heading>

      <form noValidate>
        <Stack>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register("name")} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </form>

      <Blocks blocks={blocks} setBlocks={setBlocks} />

      <Button leftIcon={<SmallAddIcon />}>Create</Button>
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
