import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from '../api/index';
import { ImageUploadState } from '../type/index';

const initialState: ImageUploadState = {
  selectedFile: null,
  compressedFile: null,
  uploadStatus: 'idle',
  uploadedImageId: null,
  fileError: null,
};

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setCompressedFile: (state, action) => {
      state.compressedFile = action.payload;
    },
    setFileError: (state, action) => {
      state.fileError = action.payload;
    },
    resetUpload: (state) => {
      state.uploadStatus = 'idle';
      state.uploadedImageId = null;
      state.fileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.uploadedImageId = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.fileError = action.payload as string;
      });
  },
});

export const { setSelectedFile, setCompressedFile, setFileError, resetUpload } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;