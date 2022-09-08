import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchCharacters } from "../../api/api";
import { AppThunk, RootState } from "../../app/store";
import { ICharacter, Nullable, RequestStatus } from "../../typing/types";

export interface IRegisterState {
    characters: Nullable<Array<ICharacter>>;
    status: RequestStatus;
    paging: {
      current: number;
      total: Nullable<number>;
    },
    filterName: Nullable<string>;
}

export interface IloadCharactersParams {
  page: number;
  filterName: Nullable<string>;
}

export const INITIAL_CURRENT_PAGE = 1;

const initialState: IRegisterState = {
    characters: null,
    status: RequestStatus.IDLE,
    paging: {
      current: INITIAL_CURRENT_PAGE,
      total: null
    },
    filterName: null
}

export const loadCharacters = createAsyncThunk(
    'register/fetchCharacters',
    async ({ page, filterName }: IloadCharactersParams) => {
      const response = await fetchCharacters(page, filterName);

      console.dir(response);

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
        setFilterName: (state, action: PayloadAction<string>) => {
          state.filterName = action.payload;
          state.paging.current = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
          state.paging.current = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadCharacters.pending, state => {
            state.status = RequestStatus.LOADING;
          })
          .addCase(loadCharacters.fulfilled, (state, action) => {
            state.status = RequestStatus.IDLE;
            state.characters = action.payload.characters;
            state.paging.total = action.payload.total;
            state.paging.current = action.payload.current;
          })
          .addCase(loadCharacters.rejected, state => {
            state.status = RequestStatus.FAILED;
          });
      }
})

export const { setFilterName, setCurrentPage } = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

export const changePaging = 
  (page: number): AppThunk =>
  (dispatch, getState) => {
    const { filterName } = selectRegister(getState());

    dispatch(setCurrentPage(page));

    dispatch(loadCharacters({ page, filterName }));
  }

export const changeFilterName = 
  (filterName: string): AppThunk => 
  dispatch => {
    dispatch(setCurrentPage(INITIAL_CURRENT_PAGE));
    dispatch(setFilterName(filterName));

    dispatch(loadCharacters({ page: INITIAL_CURRENT_PAGE, filterName }));
  }

export default registerSlice.reducer;