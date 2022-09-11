import { ResourceType } from "@prisma/client";
import { z } from "zod";

export const ResourceTypeOptions = Object.keys(ResourceType).map((key) => ({
  value: key,
  // Make all but first letter lowercase
  label: key[0] + key.slice(1).toLowerCase(),
}));

export const createResourceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  type: z.nativeEnum(ResourceType),
  url: z.string().url(),
});

export type CreateResourceFormValues = z.infer<typeof createResourceSchema>;
