import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Layout from "@/components/layout/Layout";
import CreateResourceForm, {
  CreateResourceFormValues,
} from "@/components/resource/CreateResourceForm";
import { trpc } from "@/util/trpc";

function CreateResource() {
  const createResourceMutation = trpc.useMutation("resource.create");
  const toast = useToast();

  const onSubmit = async (values: CreateResourceFormValues) => {
    await createResourceMutation.mutateAsync(values);

    toast({
      title: "Resource created.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Heading>Create Resource</Heading>
      <CreateResourceForm
        onSubmit={onSubmit}
        isLoading={createResourceMutation.isLoading}
      />
    </Layout>
  );
}

export default CreateResource;
