import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cursorTo } from "readline";
import DescribeStep from "../components/create/DescribeStep";
import Steps from "../components/create/Steps";
import Layout from "../components/layout";

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
      component: <DescribeStep />,
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

  const changeStep = (delta: number) =>
    setCurrStep(Math.max(0, Math.min(currStep + delta, steps.length - 1)));

  return (
    <Layout title="Create">
      <Stack m="auto" maxW="1000px" pt={24} align="stretch" spacing={8}>
        <Steps
          alignSelf="stretch"
          maxW="800px"
          w="full"
          m="auto"
          steps={steps.map((x) => x.title)}
          currStep={currStep}
        />
        {steps[currStep].component}
        <HStack alignSelf="flex-end">
          <Button variant="outline" onClick={() => changeStep(-1)}>
            Back
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            onClick={() => changeStep(1)}
          >
            Continue
          </Button>
        </HStack>
      </Stack>
    </Layout>
  );
};

export default Create;
