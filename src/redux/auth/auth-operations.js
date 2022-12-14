import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const fetchRefreshCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      toast.error(`Sorry error ${error.message}`, { position: 'top-center' });
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (RegisterFormSubmitValue, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/users/signup',
        RegisterFormSubmitValue
      );
      token.set(data.token);
      toast.success('You have successfully registered.', {
        position: 'top-center',
      });
      return data;
    } catch (error) {
      toast.error(`Sorry error ${error.message}`, { position: 'top-center' });
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (RegisterFormSubmitValue, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/login', RegisterFormSubmitValue);
      token.set(data.token);

      toast.success('You have successfully logged in.', {
        position: 'top-center',
      });

      return data;
    } catch (error) {
      toast.error(`Sorry error ${error.message}`, { position: 'top-center' });
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('users/logout');
      token.unset();
      toast.success('You have successfully logged out of your account.', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error(`Sorry error ${error.message}`, { position: 'top-center' });
      return rejectWithValue(error.message);
    }
  }
);
