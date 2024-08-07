import { configureStore } from "@reduxjs/toolkit";
import imageUploadReducer from "./reducers/imageUpload";
import newListingReducer from "./reducers/newListing";
import myListingsReducer from "./reducers/myListings";
import listingsReducer from "./reducers/listings";
import listingReducer from "./reducers/listing";
import editListingReducer from "./reducers/editListing";

const store = configureStore({
  reducer: {
    imageUpload: imageUploadReducer,
    newListing: newListingReducer,
    myListings: myListingsReducer,
    listings: listingsReducer,
    listing: listingReducer,
    editListing: editListingReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
