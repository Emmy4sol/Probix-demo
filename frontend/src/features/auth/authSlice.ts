import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../services/api';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  reputation: number;
  forecastsCount: number;
  correctForecasts: number;
  accuracyScore: number;
  rank?: number;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'failed';
  error?: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'idle'
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/register', payload);
      const data = response.data.data;
      setAuthToken(data.accessToken);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error ?? 'Unable to register');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', payload);
      const data = response.data.data;
      setAuthToken(data.accessToken);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error ?? 'Unable to log in');
    }
  }
);

export const refreshSession = createAsyncThunk('auth/refreshSession', async (_, thunkAPI) => {
  try {
    const response = await api.post('/auth/refresh');
    const data = response.data.data;
    setAuthToken(data.accessToken);
    return data;
  } catch (error: any) {
    setAuthToken(null);
    return thunkAPI.rejectWithValue(error.response?.data?.error ?? 'Session refresh failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
    setAuthToken(null);
    return {};
  } catch (error: any) {
    setAuthToken(null);
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = 'authenticated';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = 'authenticated';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(refreshSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = 'authenticated';
      })
      .addCase(refreshSession.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = 'idle';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = 'idle';
      });
  }
});

export default authSlice.reducer;
