import {RootState} from './index';

export const scoresSelector = (state: RootState) => state.scores;
export const sequenceSelector = (state: RootState) => state.sequence;
