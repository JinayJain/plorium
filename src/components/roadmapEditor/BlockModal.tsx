import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  CreateNoteFormValues,
  useCreateNoteForm,
} from "@/util/forms/createNote";
import {
  CreateResourceFormValues,
  useCreateResourceForm,
} from "@/util/forms/createResource";
import { useAppDispatch } from "@/util/redux/hooks";
import { addBlock } from "@/util/redux/slice/roadmapEditorSlice";

import NoteBlockCreator from "./NoteBlockCreator";
import ResourceBlockCreator from "./ResourceBlockCreator";

function BlockModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const resourceForm = useCreateResourceForm();
  const noteForm = useCreateNoteForm();

  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useAppDispatch();

  // Reset the form when the modal is closed
  // This can be changed later to save the form state and reset when submitted
  useEffect(() => {
    if (!isOpen) {
      resourceForm.reset();
      noteForm.reset();
    }
  }, [isOpen, resourceForm, noteForm]);

  const onCreateResource = (values: CreateResourceFormValues) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "resource",
        resource: values,
      }),
    );

    onClose();
  };

  const onCreateNote = (values: CreateNoteFormValues) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "note",
        note: values,
      }),
    );

    onClose();
  };

  const tabs = [
    {
      label: "Resource",
      onSubmit: resourceForm.handleSubmit(onCreateResource),
      component: <ResourceBlockCreator form={resourceForm} onClose={onClose} />,
    },
    {
      label: "Note",
      onSubmit: noteForm.handleSubmit(onCreateNote),
      component: <NoteBlockCreator form={noteForm} onClose={onClose} />,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={tabIndex} onChange={setTabIndex}>
            <TabList>
              {tabs.map((tab) => (
                <Tab key={tab.label}>{tab.label}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel key={tab.label}>{tab.component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} mr={3}>
            Cancel
          </Button>

          <Button colorScheme="green" onClick={tabs[tabIndex].onSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BlockModal;
