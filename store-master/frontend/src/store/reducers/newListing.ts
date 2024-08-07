import { createSlice } from '@reduxjs/toolkit';
import { ListingState } from '../type/index';
import { addListing } from '../api/index';

const initialState: ListingState = {
  name: '',
  description: '',
  artifacts: [],
  child_ids: [],
  message: '',
  isLoading: false,
};

const newListingSlice = createSlice({
  name: 'newListing',
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
    setMessage: (state, action) => {
      state.child_ids = action.payload;
    },
    resetListing: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(addListing.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
      });
  },
});

export const { setName, setDescription, setArtifacts, setChildIds, setMessage, resetListing } = newListingSlice.actions;
export default newListingSlice.reducer;