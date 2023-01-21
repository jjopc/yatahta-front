import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../../state/messageSlice";
import { getUser, getAuthHeader } from "../../auth/services/authService";
import axios from "axios";

export const getPatients = createAsyncThunk(
  "doctor/getPatients",
  async (arg, thunkAPI) => {
    const user = getUser();
    // console.log("AUTH_SLICE -> getPatients, user: ", user);
    const url = `${import.meta.env.VITE_API_URL}/users/${
      user.user_id
    }/patients_list/`;
    const headers = getAuthHeader();
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("ERROR getPatients en doctorSlice");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // TODO: Investigar cómo devolver valores personalizados y poder gestionar el feedback en los formularios
      // https://redux-toolkit.js.org/api/createAsyncThunk
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  patients: [],
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    removePatients(state, actions) {
      state.patients = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.patients = [];
      });
  },
});

export const selectPatientsList = (state) => state.doctor.patients;
export const { removePatients } = doctorSlice.actions;

export default doctorSlice.reducer;
