import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPublicGists, getGistForUser } from '../services/gistService';

const initialState = {
  username: '',
  gistData: {},
  requestStatus: '',
};

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

export const gistSlice = createSlice({
  name: 'gist',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
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
