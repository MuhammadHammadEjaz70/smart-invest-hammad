// imageSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  imageUrl: string | null;
}

const initialState: ImageState = {
  imageUrl: "",
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string | null>) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setImageUrl } = imageSlice.actions;
export default imageSlice.reducer;
