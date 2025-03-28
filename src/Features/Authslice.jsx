import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkUser, createUser, signout, updateuser } from '../Components/Client/Auth/Authapi';

const initialState = {
  value: '',
  loggedInUserToken: localStorage.getItem('token') || '',  // Get token from localStorage
  loggedinuser: JSON.parse(localStorage.getItem('role')) || null, 
  loggedinuser: JSON.parse(localStorage.getItem('id')) || null, 

}
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (data) => {
    const response = await createUser(data);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      if (response?.data) {
        const { token, role, id } = response.data;
        // If login is successful, store the token and role in localStorage
        localStorage.setItem('token', (token));
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('id', JSON.stringify(id));
      }
      return response.data;
    } catch (error) {

      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth', 
  async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserAsync = createAsyncThunk(
  'user/updateuser',
   async (update) => {
  try {
    const response = await updateuser(update);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const signoutAsync = createAsyncThunk(
  'user/signout',
   async (update) => {
  try {
    const response = await signout(update);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});



export const Authslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => { 
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedinuser = action.payload;
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedinuser = action.payload; // Store user data in Redux state
      state.loggedInUserToken = action.payload.token; // Store token in Redux state

    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.payload; // Store error if login failed
    })
    .addCase(updateUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedinuser = action.payload;
    })
    .addCase(signoutAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signoutAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedinuser = null;
    })
  }
  
})

// Action creators are generated for each case reducer function
export const { userLoggedin } = Authslice.actions


export const selectLoggedInUser = (state) => state.auth.loggedinuser;
export const selectError = (state) => state.auth.error;
export const selectloggedinusertoken = (state) => state.auth.loggedinuserToken;
export const selectloggedinuserid = (state) => state.auth.id;



export default Authslice.reducer