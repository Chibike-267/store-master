import { createSlice } from '@reduxjs/toolkit';
import { getListings } from '../api/index';
import { Listing } from '../type/index';

export interface ListingsState {
  listings: Listing[];
  moreListings: boolean;
  idMap: Map<string, string>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ListingsState = {
  listings: [],
  moreListings: false,
  idMap: new Map(),
  status: 'idle',
  error: null,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListings.fulfilled, (state, action) => {
        const [listings, moreListings, idMap] = action.payload;
        state.listings = listings;
        state.moreListings = moreListings;
        state.idMap = idMap;
        state.status = 'succeeded';
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default listingsSlice.reducer;
