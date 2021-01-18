import {combineReducers} from '@reduxjs/toolkit';
import devices from './slices/devices';
import scores from './slices/scores';

const reducers = combineReducers({devices, scores});

export default reducers;
