import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
});

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>;

export const defaultCreateNoteFormValues: CreateNoteFormValues = {
  title: "",
  content: "",
};

export const useCreateNoteForm = (
  props?: UseFormProps<CreateNoteFormValues>,
) => {
  return useForm<CreateNoteFormValues>({
    ...props,
    resolver: zodResolver(createNoteSchema),
    defaultValues: defaultCreateNoteFormValues,
  });
};
