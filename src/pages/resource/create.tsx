import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

import Layout from "@/components/layout/Layout";
import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  useCreateResourceForm,
} from "@/util/forms/createResource";
import useDebounce from "@/util/hooks/useDebounce";
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

  const query = useDebounce(watch("title"), 500);
  const suggestions = trpc.useQuery(["resource.suggestions", { query }]);

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
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex={3}>
          <Heading mb={4}>Create Resource</Heading>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.title} isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" {...register("title")} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
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
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
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

              <Button
                leftIcon={<SmallAddIcon />}
                colorScheme="green"
                type="submit"
              >
                Create Resource
              </Button>
            </Stack>
          </form>
        </Box>

        <Box mx={4}>
          <Divider orientation="vertical" />
        </Box>

        <Box flex={1}>
          <Heading size="md" mb={2}>
            Similar Resources
          </Heading>
          <Text color="gray">
            Help prevent duplicates by checking for similar resources.
          </Text>

          <Stack spacing={4} mt={4} overflowY="scroll">
            {suggestions.data?.map((resource) => (
              <Fragment key={resource.id}>
                <Divider />
                <Box>
                  <Heading size="sm">{resource.title}</Heading>
                  <Text fontSize="sm" my={2}>
                    {resource.description}
                  </Text>

                  <NextLink href={`/resource/${resource.id}`} passHref>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => router.push(`/resource/${resource.id}`)}
                    >
                      View
                    </Button>
                  </NextLink>
                </Box>
              </Fragment>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}

export default CreateResource;
