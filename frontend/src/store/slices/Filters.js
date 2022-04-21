import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const userSlice = createSlice({
    name: "filters",
    initialState: {
        filter: [],
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;

export const getFilters = () => async (dispatch) => {
  const json = await axios.get("http://localhost:5000/tasks");
  const data = json.data.tasks;
  dispatch(setFilter(data));
};