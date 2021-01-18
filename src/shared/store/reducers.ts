import {combineReducers} from '@reduxjs/toolkit';
import sequence from './slices/sequence';
import scores from './slices/scores';

const reducers = combineReducers({sequence, scores});

export default reducers;
