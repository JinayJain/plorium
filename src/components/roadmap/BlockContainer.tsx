import { Box, GridItem, LinkBox } from "@chakra-ui/react";
import { Fragment } from "react";

import NoteBlock from "./NoteBlock";
import ResourceBlock from "./ResourceBlock";

function BlockContainer({
  label,
  isLast,
  isFirst,
  spacing,
  children,
}: {
  label: string | number;
  isLast: boolean;
  isFirst: boolean;
  spacing: number;
  children: React.ReactNode;
}) {
  return (
    <Fragment key={label}>
      <GridItem colSpan={1} position="relative" userSelect="none">
        <Box
          position="absolute"
          top={isFirst ? "50%" : -spacing / 2}
          bottom={isLast ? "50%" : -spacing / 2}
          left="50%"
          transform="translateX(-50%)"
          width="2px"
          bg="gray.200"
        />

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          borderRadius="full"
          borderWidth={1}
          w={10}
          h={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {label}
        </Box>
      </GridItem>
      <GridItem
        as={LinkBox}
        colSpan={1}
        borderWidth={1}
        p={4}
        borderRadius="md"
      >
        {children}
      </GridItem>
    </Fragment>
  );
}

export default BlockContainer;
