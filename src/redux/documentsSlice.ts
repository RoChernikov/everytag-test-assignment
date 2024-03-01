import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  name: string;
  checksum: string;
  size: number;
}

interface DocumentsState {
  documents: Document[];
}

const initialState: DocumentsState = {
  documents: [],
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.checksum !== action.payload);
    },
  },
});

export const { addDocument, removeDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
