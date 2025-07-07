import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: { snippets: {} },
  reducers: {
    saveSnippet: (state, { payload }) => {
      const { problemNumber, language, code } = payload;
      state.snippets[problemNumber] = state.snippets[problemNumber] || {};
      state.snippets[problemNumber][language] = {
        code,
        savedAt: Date.now(),
      };
    },
  },
});

export const { saveSnippet } = editorSlice.actions;
export default editorSlice.reducer;
