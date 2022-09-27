import { Tag, TagProps } from "@chakra-ui/react";
import { ResourceType } from "@prisma/client";

const COLOR_CHOICES = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

function TypeTag({ type, ...props }: { type: ResourceType } & TagProps) {
  // assign a consistent color to each type based on its index in the enum
  const color =
    COLOR_CHOICES[
      Object.values(ResourceType).indexOf(type) % COLOR_CHOICES.length
    ];

  return (
    <Tag colorScheme={color} {...props}>
      {type}
    </Tag>
  );
}

export default TypeTag;
