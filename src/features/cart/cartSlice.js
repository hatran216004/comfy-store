import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  numItemsInCart: 0, // số lượng sản phẩm trong cart
  cartTotal: 0, // tổng giá các sp = price * amount
  shipping: 500,
  tax: 0, // thuế = 10% cartTotal
  orderTotal: 0 // tổng đơn hàng: cartTotal + shipping + tax
};

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || initialState;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.cartID === product.cartID
      );

      if (existingItem) {
        existingItem.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Item added to cart');
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const removeItem = state.cartItems.find((item) => item.cartID === cartID);
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.numItemsInCart -= removeItem.amount;
      state.cartTotal -= removeItem.amount * removeItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item removed from cart');

      if (state.numItemsInCart === 0) cartSlice.caseReducers.clearCart();
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      console.log(cartID, amount);
      const editItem = state.cartItems.find((item) => item.cartID === cartID);

      state.numItemsInCart += amount - editItem.amount; // tổng số lượng sp trong cart + số lượng sp muôn edit - slg sản phẩm edit(tồn tại trong cart)
      state.cartTotal += editItem.price * (amount - editItem.amount);

      editItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

export const getCart = (store) => store.cart.cartItems;
export const getNumItemsInCart = (store) => store.cart.numItemsInCart;
export const getCartTotal = (store) => store.cart.cartTotal;

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
