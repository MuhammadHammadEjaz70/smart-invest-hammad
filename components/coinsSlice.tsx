// coinsSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinsState {
  coins: number;
}

const initialState: CoinsState = {
  coins: 0,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
