import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductSlice';
import loginReducer from './LoginSlice';

export const MyStore = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
  },
})

export type RootState = ReturnType<typeof MyStore.getState>
export type AppDispatch = typeof MyStore.dispatch