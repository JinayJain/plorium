import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";

import Layout from "@/components/layout/Layout";
import {
  CreateRoadmapFormValues,
  useCreateRoadmapForm,
} from "@/util/forms/createRoadmap";
import { useAppDispatch, useAppSelector } from "@/util/redux/hooks";
import { moveBlock } from "@/util/redux/slice/roadmapEditorSlice";
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
    await createRoadmapMutation.mutateAsync({
      ...values,
      blocks,
    });

    toast({
      title: "Roadmap created.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Layout title="Create Roadmap">
      <Heading mb={4}>Create Roadmap</Heading>

      <FormControl {...getFieldControlProps("title")} mb={4}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title")} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl {...getFieldControlProps("description")} mb={8}>
        <FormLabel>Description</FormLabel>
        <Textarea {...register("description")} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

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
      <Divider my={4} />

      <ButtonGroup float="right" mt={4} spacing={2}>
        <NextLink href="/roadmap" passHref>
          <Button as="a" variant="outline">
            Cancel
          </Button>
        </NextLink>
        <Button
          colorScheme="green"
          onClick={handleSubmit(onSubmit)}
          isLoading={createRoadmapMutation.isLoading}
        >
          Create
        </Button>
      </ButtonGroup>
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
