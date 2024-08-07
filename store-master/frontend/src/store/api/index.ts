import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../service/index";
import { humanReadableError } from '../../constants/backend';
import { UploadImageResponse, NewListing, Listing } from "../type/index";
import { AxiosError } from "axios";

export const uploadImage = createAsyncThunk(
  'imageUpload/uploadImage',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<UploadImageResponse>(
        "/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.image_id;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data || 'Failed to upload image');
    }
  }
);

export const addListing = createAsyncThunk(
  'listing/add',
  async (listing: NewListing, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/listing/add', listing);
      return 'Listing added successfully.';
    } catch (error) {
      return rejectWithValue('Error adding Listing');
    }
  }
);

export const getMyListings = createAsyncThunk<[Listing[], boolean], number, { rejectValue: string }>(
  'listings/me',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/listings/me?page=${page}`);
      const { listings, moreListings } = response.data;

      if (!Array.isArray(listings)) {
        throw new Error('Invalid response format: listings');
      }

      if (typeof moreListings !== 'boolean') {
        throw new Error('Invalid response format: moreListings');
      }

      return [listings, moreListings];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }
);

export const getListings = createAsyncThunk<[Listing[], boolean, Map<string, string>], { pageNumber: number; searchQuery: string; }, { rejectValue: string }>(
  'listings/getListings',
  async ({ pageNumber, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/listings/search', {
        params: {
          page: pageNumber,
          ...(searchQuery && { search_query: searchQuery }),
        },
      });

      const { listings, moreListings } = response.data;

      if (!Array.isArray(listings)) {
        throw new Error('Invalid listings format: expected an array');
      }

      if (typeof moreListings !== 'boolean') {
        throw new Error('Invalid moreListings format: expected a boolean');
      }

      const ids = new Set<string>(listings.map(listing => listing.user_id));
      const idMap = new Map(Array.from(ids).map(id => [id, '']));
      
      return [listings, moreListings, idMap];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fatal error occurred');
    }
  }
);

export const getListingById = createAsyncThunk<Listing, string, { rejectValue: string }>(
  'listings/:ListingId',
  async (listingId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/listings/${listingId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(humanReadableError(error));
    }
  }
);

export const editListing = createAsyncThunk(
  'listings/listingId',
  async (listing: Listing, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/listings/edit/${listing.id}`, listing);
      return 'Listing added successfully.';
    } catch (error) {
      return rejectWithValue(humanReadableError(error));
    }
  }
);

export const deleteListing = createAsyncThunk<void, string, { rejectValue: string }>(
  'listings/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/listings/delete/${id}`);
    } catch (error) {
      return rejectWithValue((error as Error).message || 'An error occurred while deleting listing');
    }
  }
);