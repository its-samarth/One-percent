import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
});

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  // Here you can add any API call if needed for logout
  return; // No data to return for this example
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default loginSlice.reducer;
