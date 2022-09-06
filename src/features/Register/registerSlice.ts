import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICharacter } from "../Card/cardSlice";
import { fetchCharacters } from "./registerApi";

type Nullable<T> = T | null;

type ICharacters = Array<ICharacter>;

export interface IRegisterState {
    characters: Nullable<Array<ICharacter>>;
    status: 'idle' | 'loading' | 'failed';
    paging: {
      current: number;
      total: Nullable<number>;
    },
    filter: {
      name: Nullable<string>;
    }
}

const initialState: IRegisterState = {
    characters: null,
    status: 'idle',
    paging: {
      current: 1,
      total: null
    },
    filter: {
      name: null
    }
}

export const loadCharacters = createAsyncThunk(
    'register/fetchCharacters',
    async (page: number) => {
      const response = await fetchCharacters(page);

      return {
        characters: response.results,
        total: response.info.pages,
        current: page
      }
    }
)

export const loadCharactersByName = createAsyncThunk(
  'register/fetchCharactersByName',
  async (page: number) => {
    const response = await fetchCharacters(page);

    return {
      characters: response.results,
      total: response.info.pages,
      current: page
    }
  }
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
            state.characters = action.payload.characters;
            state.paging.total = action.payload.total;
            state.paging.current = action.payload.current;
          })
          .addCase(loadCharacters.rejected, (state) => {
            state.status = 'failed';
          });
      }
})

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;