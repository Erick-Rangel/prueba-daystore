import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";


export const userSlice = createSlice({
    name: "ciudades",
    initialState:{
        data: []
    },
    reducers: {
        setCiudades: (state, action) => {
            state.data = action.payload;
        },
    }
});

export const { setCiudades } = userSlice.actions;
export default userSlice.reducer;

export const getAllCiudades = () => async (dispatch) => {    
    const json = await axios.get("http://localhost:5000/tasks")
    const data = json.data.tasks;
    dispatch(setCiudades(data));
}

export const getCiudad = (id) => async (dispatch) => {
    const json = await axios.get("http://localhost:5000/tasks/" + id)
    let data = [];
    const resp = await json.data.task;
    data.push(resp);
    dispatch(setCiudades(data));
}