const { createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  loading: false,
  users: [],
  errorMessage: ""
};

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users", {
      headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    .then((res) => res.data.map((usr) => usr.id));
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.errorMessage = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.errorMessage = action.error.message;
    });
  }
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
