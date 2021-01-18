import {createSlice} from '@reduxjs/toolkit';

interface DevicesState {
  loading: boolean;
  error: any;
  data: string;
}

const initialState: DevicesState = {
  loading: false,
  error: null,
  data: '',
};

export const devices = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
});

export default devices.reducer;
