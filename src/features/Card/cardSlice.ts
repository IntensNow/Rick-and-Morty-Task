import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCharacter } from "./cardApi";

type Nullable<T> = T | null;

export interface ICharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    origin: { 
        name: string; 
    },
    image: string;
}

export interface ICardState {
    character: Nullable<ICharacter>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ICardState = {
    character: null,
    status: 'idle'
}

export const loadCharacter = createAsyncThunk(
    'card/fetchCharacter',
    fetchCharacter
)

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCharacter: (state, action: PayloadAction<ICharacter>) => {
            state.character = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadCharacter.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loadCharacter.fulfilled, (state, action) => {
            state.status = 'idle';
            state.character = action.payload;
          })
          .addCase(loadCharacter.rejected, (state) => {
            state.status = 'failed';
          });
      }
})

export const selectCard = (state: RootState) => state.card;

export default cardSlice.reducer;