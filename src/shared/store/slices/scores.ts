import {createSlice} from '@reduxjs/toolkit';
import {ScoreType} from '../../types';

const initialState: Array<ScoreType> = [];

export const scores = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addScore: (state, {payload}) =>
      [...state, payload]
        .sort((a, b) => a.score - b.socre)
        .filter(
          (score, index, self) =>
            index === self.findIndex((t) => t.userName === score.userName),
        )
        .slice(0, 10),
  },
});

export const scoresActions = scores.actions;

export default scores.reducer;
