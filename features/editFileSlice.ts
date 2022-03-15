import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditModeEnum } from '../interfaces';
import { RootState } from '../app/store';

export type EditFileState = {
  editMode: EditModeEnum | null;
};

const initialState: EditFileState = {
  editMode: null,
};

export const editFileSlice = createSlice({
  name: 'editFile',
  initialState,
  reducers: {
    changeEditMode(state, action: PayloadAction<EditModeEnum>) {
      state.editMode = action.payload;
    },
  },
});

export const { changeEditMode } = editFileSlice.actions;

export const editModeSelector = (state: RootState): EditModeEnum =>
  state.editFile.editMode;

export default editFileSlice.reducer;
