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
import BuildStep from "../components/create/BuildStep";
import DescribeStep, {
  DescribeValues,
} from "../components/create/DescribeStep";
import PublishStep from "../components/create/PublishStep";
import Steps from "../components/create/Steps";
import Layout from "../components/layout";

interface RoadmapValues {
  title: string;
  description: string;
}

const Create = () => {
  const [currStep, setCurrStep] = useState(0);
  const [roadmap, setRoadmap] = useState<RoadmapValues>({
    title: "",
    description: "",
  });

  const changeStep = (delta: number) =>
    setCurrStep(Math.max(0, Math.min(currStep + delta, steps.length - 1)));

  const steps = [
    {
      title: "Describe",
      component: (
        <DescribeStep
          onNext={(values) => {
            setRoadmap({
              ...roadmap,
              ...values,
            });
            changeStep(1);
          }}
          values={roadmap}
        />
      ),
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
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            key={currStep}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{ duration: 0.2 }}
          >
            {steps[currStep].component}
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Layout>
  );
};

export default Create;
