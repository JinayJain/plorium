import { Button, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Steps from "../components/create/Steps";
import Layout from "../components/layout";

const Describe = () => {
  return (
    <Flex align="center" flexDir="column">
      <Heading>Describe your roadmap</Heading>
    </Flex>
  );
};

const Build = () => {
  return (
    <Flex align="center" flexDir="column">
      <Heading>Build your roadmap</Heading>
    </Flex>
  );
};

const Publish = () => {
  return (
    <Flex align="center" flexDir="column">
      <Heading>Publish your roadmap</Heading>
    </Flex>
  );
};

const Create = () => {
  const [currStep, setCurrStep] = useState(0);

  const steps = [
    {
      title: "Describe",
      component: <Describe />,
    },

    {
      title: "Build",
      component: <Build />,
    },

    {
      title: "Publish",
      component: <Publish />,
    },
  ];

  return (
    <Layout title="Create">
      <Stack maxW="1400px" m="auto" pt={24}>
        <Steps
          maxW="800px"
          m="auto"
          steps={steps.map((x) => x.title)}
          currStep={currStep}
        />
        {steps[0].component}
        <HStack alignSelf="flex-end">
          <Button variant="outline">Back</Button>
          <Button colorScheme="green" variant="solid">
            Continue
          </Button>
        </HStack>
      </Stack>
    </Layout>
  );
};

export default Create;
