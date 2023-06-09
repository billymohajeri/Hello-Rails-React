import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  greeting: '',
  loading: false,
  error: '',
};

export const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {
    getGreetingRequest: (state) => {
      state.loading = true;
    },
    getGreetingSuccess: (state, action) => {
      state.loading = false;
      state.greeting = action.payload.message;
      state.error = '';
    },
    getGreetingFailure: (state, action) => {
      state.loading = false;
      state.greeting = '';
      state.error = action.payload;
    },
  },
});

export const fetchGreeting = () => async (dispatch) => {
  dispatch(getGreetingRequest());
  try {
    const response = await axios.get(
      'http://localhost:3000/api/v1/messages/random_greeting'
    );
    console.log(response.data);
    dispatch(getGreetingSuccess(response.data));
  } catch (error) {
    dispatch(getGreetingFailure(error.message));
  }
};

export const { getGreetingRequest, getGreetingSuccess, getGreetingFailure } =
  greetingSlice.actions;

export default greetingSlice.reducer;
