import { createSlice } from '@reduxjs/toolkit';
import { EditListingState } from '../type/index';
import { editListing, getListingById } from '../api/index';

const initialState: EditListingState = {
  name: '',
  description: '',
  artifacts: [],
  listing_id: '',
  child_ids: [],
  loading: false,
  error: null,
};

const editListingSlice = createSlice({
  name: 'editListing',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload;
    },
    setChildIds: (state, action) => {
      state.child_ids = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getListingById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getListingById.fulfilled, (state, action) => {
      state.loading = false;
      state.name = action.payload.name;
      state.description = action.payload.description || '';
      state.listing_id = action.payload.id;
      state.artifacts = action.payload.artifact_ids.map(id => ({ id, caption: 'hi' }));
      state.child_ids = action.payload.child_ids;
    })
    .addCase(getListingById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
      .addCase(editListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editListing.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setName, setDescription, setArtifacts, setChildIds } = editListingSlice.actions;
export default editListingSlice.reducer;