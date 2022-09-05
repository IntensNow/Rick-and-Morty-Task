import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICharacter } from "../Card/cardSlice";
import { fetchCharacters } from "./registerApi";

type Nullable<T> = T | null;

type ICharacters = Array<ICharacter>;

export interface IRegisterState {
    characters: Nullable<Array<ICharacter>>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: IRegisterState = {
    characters: null,
    status: 'idle'
}

export const loadCharacters = createAsyncThunk(
    'register/fetchCharacters',
    fetchCharacters
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacters>) => {
            state.characters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadCharacters.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loadCharacters.fulfilled, (state, action) => {
            state.status = 'idle';
            state.characters = action.payload;
          })
          .addCase(loadCharacters.rejected, (state) => {
            state.status = 'failed';
          });
      }
})

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;