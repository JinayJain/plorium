import { ResourceType } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BaseBlock = {
  editorId: string;
};

export type ResourceBlock = BaseBlock & {
  kind: "resource";
  resource: {
    id?: number;
    title: string;
    description: string;
    url: string;
    type: ResourceType;
  };
};

export type NoteBlock = BaseBlock & {
  kind: "note";
  note: {
    title?: string;
    content: string;
  };
};

type RoadmapBlock = ResourceBlock | NoteBlock;

interface RoadmapEditorState {
  blocks: RoadmapBlock[];
}

const initialState: RoadmapEditorState = {
  blocks: [],
};

export const roadmapEditorSlice = createSlice({
  name: "roadmapEditor",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<ResourceBlock | NoteBlock>) => {
      state.blocks.push({
        ...action.payload,
      });
    },
    moveBlock: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [removed] = state.blocks.splice(from, 1);
      state.blocks.splice(to, 0, removed);
    },
  },
});

export const { addBlock, moveBlock } = roadmapEditorSlice.actions;

export default roadmapEditorSlice.reducer;
