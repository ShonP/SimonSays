import {createSlice} from '@reduxjs/toolkit';

const initialState: Array<number> = [];

export const sequence = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    resetSequence: () => [],
    addSequence: (state) => [...state, Math.floor(Math.random() * 4)],
  },
});

export const sequenceActions = sequence.actions;

export default sequence.reducer;
