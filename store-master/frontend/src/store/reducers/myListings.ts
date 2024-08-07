import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListingsState, Listing } from '../type/index';
import { getMyListings } from '../api/index';

const initialState: ListingsState = {
  listings: [],
  moreListings: false,
  status: 'idle',
  error: null,
};

const myListingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMyListings.fulfilled, (state, action: PayloadAction<[Listing[], boolean]>) => {
        const [listings, moreListings] = action.payload;
        state.listings = listings;
        state.moreListings = moreListings;
        state.status = 'succeeded';
      })
      .addCase(getMyListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default myListingsSlice.reducer;
