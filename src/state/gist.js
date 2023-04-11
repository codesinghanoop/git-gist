import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPublicGists, getGistForUser } from '../services/gistService';

const initialState = {
  username: '',
  gistData: [],
  requestStatus: '',
};

//Thunk operation to handle api call to get public gist and can be called as a reduc action from component
export const fetchPublicGist = createAsyncThunk(
  'fetch/publicGist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPublicGists();
      return res?.data;
    } catch (error) {
      console.log('🚀 ~ file: gist.js ~ fetchPublicGist ~ error:', error);
      return rejectWithValue(error);
    }
  }
);

//Thunk operation to handle api call to get user gist and can be called as a reduc action from component
export const fetchGistByUsername = createAsyncThunk(
  'fetch/user/gist',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getGistForUser(payload);
      return res?.data;
    } catch (error) {
      console.log('🚀 ~ file: gist.js ~ fetchGistByUsername ~ error:', error);
      return rejectWithValue(error);
    }
  }
);

//Slice will manipulate store state and creates actions
export const gistSlice = createSlice({
  name: 'gist',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    //Manipulating public gist call status
    builder.addCase(fetchPublicGist.pending, (state, action) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(fetchPublicGist.fulfilled, (state, { payload }) => {
      state.requestStatus = 'succeeded';
      state.gistData = payload
    });
    builder.addCase(fetchPublicGist.rejected, (state, action) => {
      state.requestStatus = 'failed';
    });
    //Manipulating user gist call status
    builder.addCase(fetchGistByUsername.pending, (state, action) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(fetchGistByUsername.fulfilled, (state, { payload }) => {
      state.requestStatus = 'succeeded';
      state.gistData = payload
    });
    builder.addCase(fetchGistByUsername.rejected, (state, action) => {
      state.requestStatus = 'failed';
    });
  },
});

export default gistSlice.reducer;
