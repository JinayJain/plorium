import { ResourceType } from "@prisma/client";
import { z } from "zod";

export const resourceSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  type: z.nativeEnum(ResourceType),
});

export const noteSchema = z.object({
  title: z.string().optional(),
  content: z.string(),
});

export const roadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  blocks: z
    .array(
      z.union([
        z.object({
          kind: z.literal("note"),
          note: noteSchema,
        }),
        z.object({
          kind: z.literal("resource"),
          resource: resourceSchema,
        }),
      ]),
    )
    .min(1),
});
