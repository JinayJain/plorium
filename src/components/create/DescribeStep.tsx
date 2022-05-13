import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

export interface DescribeValues {
  title: string;
  description: string;
}

const DescribeSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const DescribeStep = ({
  values,
  onNext,
}: {
  values: DescribeValues;
  onNext: (values: DescribeValues) => void;
}) => {
  return (
    <Formik
      initialValues={values}
      onSubmit={onNext}
      validationSchema={DescribeSchema}
    >
      {(props: FormikProps<DescribeValues>) => (
        <Form>
          <Stack spacing={4}>
            <Heading alignSelf="center">Describe your roadmap</Heading>
            <FormControl
              isInvalid={!!props.errors.title && props.touched.title}
            >
              <FormLabel>Title</FormLabel>
              <Field as={Input} name="title" placeholder="Title" />
              <FormErrorMessage>{props.errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!props.errors.description && props.touched.description
              }
            >
              <FormLabel>Description</FormLabel>
              <Field
                as={Textarea}
                name="description"
                placeholder="Describe your roadmap in a few sentences"
              />
              <FormErrorMessage>{props.errors.description}</FormErrorMessage>
            </FormControl>
            <Button
              alignSelf="flex-end"
              type="submit"
              colorScheme="green"
              isLoading={props.isSubmitting}
            >
              Continue
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default DescribeStep;
