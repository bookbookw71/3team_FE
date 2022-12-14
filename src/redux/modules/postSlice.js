import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/api";
import api from "../../shared/api";

// WHAT μ΄κΈ°κ°
const initialState = {
  isLoading: false,
  posts: [],
  post: {},
  success: false,
  // data: [
  //   {
  //     imageUrl: "",
  //     nickname: "",
  //     title: "",
  //     readStart: "2000-01-01",
  //     readEnd: "2999-12-31",
  //     comment: "",
  //     publisher: "",
  //   },
  // ],
  error: null,
};

export const __getAllReviews = createAsyncThunk(
  "post/getReviews",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/posts`);
      // const { data } = await api.get(`/api/auth/post`);
      // console.log("π ~ const__getReview=createAsyncThunk ~ data", data);

      console.log(data);
      return thunkAPI.fulfillWithValue(data);
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getReview = createAsyncThunk(
  "/post/getReview",
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.get(`/posts/${id}`);
      // const { data } = await instance.get(`/api/auth/post/${id}`);
      console.log(data);
      // μλ²μ©...
      // return thunkAPI.fulfillWithValue(data.data);

      // μλ²λ λ‘μ»¬μ΄λ κ΅¬μ‘°κ° λ¬λΌμ!!! μκ²μ΅λλ€!
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addReview = createAsyncThunk(
  "post/addReview",
  async (args, thunkAPI) => {
    try {
      const { data } = await api.post("/posts", args);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __editReview = createAsyncThunk(
  "post/editReview",
  async (args, thunkAPI) => {
    try {
      const { data } = await api.put("/posts", args);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [__getAllReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllReviews.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getAllReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getReview.pending]: (state) => {
      state.isLoading = true;
    },
    [__getReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__addReview.pending]: (state) => {
      state.isLoading = true;
    },
    [__addReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__addReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editReview.pending]: (state) => {
      state.isLoading = true;
    },
    [__editReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("λ°μ΄ν°", action.payload.data);
      const newState = state.posts.map((post) => {
        if (post.id === action.payload.data.id) {
          post = {
            ...post,
            title: action.payload.data.title,
            comment: action.payload.data.comment,
            readStart: action.payload.data.readStart,
            readEnd: action.payload.data.readEnd,
            star: action.payload.data.star,
            page: action.payload.data.page,
          };
        }
      });
      state.post = newState;
      return state;
    },
    [__editReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
