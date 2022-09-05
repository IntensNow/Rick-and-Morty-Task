import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardReducer from '../features/Card/cardSlice';
import registerReducer from '../features/Register/registerSlice';

export const store = configureStore({
  reducer: {
    card: cardReducer,
    register: registerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
