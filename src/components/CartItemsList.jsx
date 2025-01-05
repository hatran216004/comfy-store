import { useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';
import CartItem from './CartItem';

function CartItemsList() {
  const cart = useSelector(getCart);
  return (
    <div>
      {cart.map((item) => {
        return <CartItem key={item.cartID} cartItem={item} />;
      })}
    </div>
  );
}

export default CartItemsList;
