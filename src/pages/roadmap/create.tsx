import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";
import {
  CreateRoadmapFormValues,
  useCreateRoadmapForm,
} from "@/util/forms/createRoadmap";
import { useAppDispatch, useAppSelector } from "@/util/redux/hooks";
import { moveBlock } from "@/util/redux/slice/roadmapEditorSlice";
import type { ResourceBlock } from "@/util/redux/slice/roadmapEditorSlice";
import { trpc } from "@/util/trpc";

const BlocksEditor = dynamic(
  () => import("@/components/roadmapEditor/BlocksEditor"),
  {
    ssr: false,
  },
);

function CreateRoadmap() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateRoadmapForm();
  const createRoadmapMutation = trpc.useMutation("roadmap.create");
  const toast = useToast();

  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.roadmapEditor.blocks);

  const getFieldControlProps = (name: keyof CreateRoadmapFormValues) => ({
    isInvalid: !!errors[name],
    isRequired: true,
  });

  const onSubmit = async (values: CreateRoadmapFormValues) => {
    const resourceBlocks = blocks.filter(
      (block): block is ResourceBlock => block.kind === "resource",
    );

    await createRoadmapMutation.mutateAsync({
      ...values,
      blocks: resourceBlocks,
    });

    toast({
      title: "Roadmap created.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Heading>Create Roadmap</Heading>

      <FormControl {...getFieldControlProps("title")}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title")} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl {...getFieldControlProps("description")}>
        <FormLabel>Description</FormLabel>
        <Textarea {...register("description")} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <Heading size="md">Blocks</Heading>

      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }

          dispatch(
            moveBlock({
              from: result.source.index,
              to: result.destination?.index,
            }),
          );
        }}
      >
        <BlocksEditor />
      </DragDropContext>

      <Button onClick={handleSubmit(onSubmit)}>Create</Button>
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
