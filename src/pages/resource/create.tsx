import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Layout from "@/components/layout/Layout";
import ResourceSuggestions from "@/components/resource/ResourceSuggestions";
import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  createResourceSchema,
  useCreateResourceForm,
} from "@/util/forms/create-resource";
import { trpc } from "@/util/trpc";

function CreateResource() {
  const createResourceMutation = trpc.useMutation("resource.create");
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCreateResourceForm();

  const onSubmit = async (values: CreateResourceFormValues) => {
    const resource = await createResourceMutation.mutateAsync(values);

    toast({
      title: "Resource created.",
      status: "success",
      isClosable: true,
    });
    reset();
    router.push(`/resource/${resource.id}`);
  };

  return (
    <Layout>
      <Heading>Create Resource</Heading>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register("name")} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.url} isRequired>
            <FormLabel>URL</FormLabel>
            <Input type="url" {...register("url")} />
            <FormHelperText>https://example.com/resource</FormHelperText>
            <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
            <FormHelperText>
              Share more about this resource and why it&apos;s great
            </FormHelperText>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.type} isRequired>
            <FormLabel>Resource Type</FormLabel>
            <Select {...register("type")}>
              {ResourceTypeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
          </FormControl>

          <Accordion defaultIndex={0} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Similar Resources
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel maxH="200px" overflowY="auto">
                <ResourceSuggestions
                  query={watch("name")}
                  onSelect={(resource) => {
                    console.log(resource);
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Button leftIcon={<SmallAddIcon />} colorScheme="green" type="submit">
            Create Resource
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}

export default CreateResource;
