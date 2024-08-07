import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getListingById } from '../api/index';
import { Listing } from '../type/index';

export interface ListingState {
  data: Listing | null;
  loading: boolean;
  error: string | null;
};

const initialState: ListingState = {
  data: null,
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListingById.fulfilled, (state, action: PayloadAction<Listing>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default listingSlice.reducer;
