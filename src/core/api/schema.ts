import { ResourceType } from "@prisma/client";
import { z } from "zod";

export const resourceSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  type: z.nativeEnum(ResourceType),
});

export const roadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  blocks: z.array(resourceSchema),
});
