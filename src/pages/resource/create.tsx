import Layout from "@/components/layout/Layout";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { ResourceType } from "@prisma/client";

const ResourceTypeOptions = Object.keys(ResourceType).map((key) => ({
  value: key,
  // Make all but first letter lowercase
  label: key[0] + key.slice(1).toLowerCase(),
}));

function CreateResource() {
  return (
    <Layout>
      <Heading>Create Resource</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input type="url" />
          <FormHelperText>https://example.com/resource</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea />
          <FormHelperText>
            Share more about what this resource covers and why it&apos;s great
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Resource Type</FormLabel>
          <Select>
            {ResourceTypeOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="green" loadingText="Creating Resource">
          Create Resource
        </Button>
      </Stack>
    </Layout>
  );
}

export default CreateResource;
