import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createRoadmapSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
});

export type CreateRoadmapFormValues = z.infer<typeof createRoadmapSchema>;

export const defaultCreateRoadmapFormValues: CreateRoadmapFormValues = {
  name: "",
  description: "",
};

export const useCreateRoadmapForm = () => {
  return useForm<CreateRoadmapFormValues>({
    resolver: zodResolver(createRoadmapSchema),
    defaultValues: defaultCreateRoadmapFormValues,
  });
};
