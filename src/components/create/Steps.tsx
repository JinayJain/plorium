import {
  Box,
  BoxProps,
  Circle,
  HStack,
  StackProps,
  Text,
} from "@chakra-ui/react";

const ProgressBarInner = ({ percent }: { percent: number }) => {
  return (
    <Box
      bg="green.300"
      height="100%"
      width={`${percent}%`}
      transition="ease 0.3s"
    />
  );
};

const ProgressBar = ({
  percent,
  ...props
}: {
  percent: number;
} & BoxProps) => {
  return (
    <Box bg="gray.200" h={1} {...props}>
      <ProgressBarInner percent={percent} />
    </Box>
  );
};

const Step = ({
  title,
  index,
  completed = false,
  isCurrent = false,
  size = "48px",
}: {
  title: string;
  index: number;
  size?: string;
  completed?: boolean;
  isCurrent?: boolean;
}) => {
  return (
    <HStack>
      <Circle
        bg={completed ? "green.600" : "none"}
        color={completed ? "white" : "gray.500"}
        border={isCurrent || !completed ? "2px solid" : "none"}
        borderColor={isCurrent ? "green.500" : "gray.500"}
        size={size}
        transition="color ease 0.5s"
      >
        <Text fontSize="xl" fontWeight="bold">
          {index}
        </Text>
      </Circle>
      <Text>{title}</Text>
    </HStack>
  );
};

const Steps = ({
  currStep,
  steps,
  ...props
}: {
  currStep: number;
  steps: string[];
} & StackProps) => {
  return (
    <HStack spacing={2} {...props}>
      {steps.map((step, index) => {
        const completed = index < currStep;
        const isCurrent = index === currStep;
        const percent = index <= currStep ? 100 : 0;

        return index === 0 ? (
          <Step
            key={step}
            title={step}
            index={index + 1}
            completed={completed}
            isCurrent={isCurrent}
          />
        ) : (
          <>
            <ProgressBar key={`${step}-divider`} flex={1} percent={percent} />
            <Step
              key={step}
              title={step}
              index={index + 1}
              completed={completed}
              isCurrent={isCurrent}
            />
          </>
        );
      })}
    </HStack>
  );
};

export default Steps;
