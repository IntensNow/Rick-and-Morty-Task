import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchSingleCharacter } from "../../api/api";
import { RootState } from "../../app/store";
import { ICharacter, Nullable, RequestStatus } from "../../typing/types";

export interface ICardState {
    character: Nullable<ICharacter>;
    status: RequestStatus;
}

const initialState: ICardState = {
    character: null,
    status: RequestStatus.IDLE
}

export const loadCharacter = createAsyncThunk(
    'card/fetchCharacter',
    fetchSingleCharacter
)

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(loadCharacter.pending, state => {
            state.status = RequestStatus.LOADING;
          })
          .addCase(loadCharacter.fulfilled, (state, action) => {
            state.status = RequestStatus.IDLE;
            state.character = action.payload;
          })
          .addCase(loadCharacter.rejected, state => {
            state.status = RequestStatus.FAILED;
          });
      }
})

export const selectCard = (state: RootState) => state.card;

export default cardSlice.reducer;