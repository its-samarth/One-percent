import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductSlice';

export const MyStore = configureStore({
  reducer: {
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof MyStore.getState>
export type AppDispatch = typeof MyStore.dispatch