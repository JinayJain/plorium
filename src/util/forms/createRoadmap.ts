import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

export const createRoadmapSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export type CreateRoadmapFormValues = z.infer<typeof createRoadmapSchema>;

export const defaultCreateRoadmapFormValues: CreateRoadmapFormValues = {
  title: "",
  description: "",
};

export const useCreateRoadmapForm = (
  props?: UseFormProps<CreateRoadmapFormValues>,
) => {
  return useForm<CreateRoadmapFormValues>({
    ...props,
    resolver: zodResolver(createRoadmapSchema),
    defaultValues: defaultCreateRoadmapFormValues,
  });
};
