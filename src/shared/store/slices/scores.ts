import {createSlice} from '@reduxjs/toolkit';
import {Score} from '../../types';

interface ScoresState {
  scores: Array<Score>;
}

const initialState: ScoresState = {
  scores: [],
};

export const scores = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addScore: (state, {payload}) => ({
      ...state,
      scores: [...state.scores, payload]
        .sort((a, b) => a.score - b.socre)
        .filter(
          (score, index, self) =>
            index === self.findIndex((t) => t.userName === score.userName),
        )
        .slice(0, 10),
    }),
  },
});

export default scores.reducer;
