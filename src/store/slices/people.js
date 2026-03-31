import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularPeople } from "../../services/people";

export const peopleAction = createAsyncThunk('people/getAll', async () => {
    try {
        const res = await getPopularPeople();
        return res.data.results;
    } catch (err) {
        throw err;
    }
});

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        people: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(
            peopleAction.pending, (state, action) => {
                state.loading = true;
            }
        ),
        builder.addCase(
            peopleAction.fulfilled, (state, action) => {
                state.loading = false;
                state.people = action.payload;
            }
        ),
        builder.addCase(
            peopleAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            }
        )
    }
});

export default peopleSlice.reducer;


