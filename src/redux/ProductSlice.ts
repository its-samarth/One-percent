// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter(product => product.id !== productId);
      },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
