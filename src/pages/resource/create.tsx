import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ResourceType } from "@prisma/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import { trpc } from "@/util/trpc";

const ResourceTypeOptions = Object.keys(ResourceType).map((key) => ({
  value: key,
  // Make all but first letter lowercase
  label: key[0] + key.slice(1).toLowerCase(),
}));

function CreateResource() {
  const createResourceMutation = trpc.useMutation("resource.create");
  const router = useRouter();

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      description: "",
      url: "",
      type: ResourceTypeOptions[0].value,
    },
    onSubmit: async ({ name, description, url, type }) => {
      try {
        const result = await createResourceMutation.mutateAsync({
          name,
          description,
          url,
          type: type as ResourceType,
        });

        router.push(`/resource/${result.id}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <Heading>Create Resource</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>URL</FormLabel>
            <Input
              type="url"
              name="url"
              onChange={handleChange}
              value={values.url}
            />
            <FormHelperText>https://example.com/resource</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              onChange={handleChange}
              value={values.description}
            />
            <FormHelperText>
              Share more about this resource and why it&apos;s great
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Resource Type</FormLabel>
            <Select name="type" onChange={handleChange} value={values.type}>
              {ResourceTypeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            colorScheme="green"
            type="submit"
            isLoading={createResourceMutation.isLoading}
            loadingText="Creating"
            rightIcon={<SmallAddIcon />}
          >
            Create
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}

export default CreateResource;
