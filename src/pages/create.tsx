import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import BuildStep from "../components/create/BuildStep";
import DescribeStep from "../components/create/DescribeStep";
import PublishStep from "../components/create/PublishStep";
import Steps from "../components/create/Steps";
import Layout from "../components/layout";

const Create = () => {
  const [currStep, setCurrStep] = useState(0);

  const changeStep = (delta: number) =>
    setCurrStep(Math.max(0, Math.min(currStep + delta, steps.length - 1)));

  const steps = [
    {
      title: "Describe",
      component: <DescribeStep onNext={() => changeStep(1)} />,
    },

    {
      title: "Build",
      component: (
        <BuildStep onNext={() => changeStep(1)} onPrev={() => changeStep(-1)} />
      ),
    },

    {
      title: "Publish",
      component: (
        <PublishStep
          onSubmit={() => changeStep(1)}
          onPrev={() => changeStep(-1)}
        />
      ),
    },
  ];

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
      </Stack>
    </Layout>
  );
};

export default Create;
