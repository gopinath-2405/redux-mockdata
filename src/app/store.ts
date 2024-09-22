import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import mockDataAPI from '../features/mockdata/mockDataAPI';
import { setupListeners } from '@reduxjs/toolkit/query';



export const store = configureStore({
  reducer: {
    [mockDataAPI.reducerPath]: mockDataAPI.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(mockDataAPI.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
