import { useSelector } from 'react-redux';
import { CartTotals, CheckoutForm, SectionTitle } from '../components';
import { clearCart, getCartTotal } from '../features/cart/cartSlice';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch, { formatPrice } from '../utils';

const url = '/orders';

export function loader(store) {
  return () => {
    const user = store.getState().user.user;
    if (!user) {
      toast.warn('You must be logged in to checkout');
      return redirect('/login');
    }
    return null;
  };
}

export function action(store, queryClient) {
  return async ({ request }) => {
    const { cartItems, numItemsInCart, orderTotal } = store.getState().cart;
    const { token } = store.getState().user.user;

    const { name, address } = Object.fromEntries(await request.formData());
    const data = {
      address,
      name,
      cartItems,
      chargeTotal: orderTotal,
      numItemsInCart,
      orderTotal: formatPrice(orderTotal)
    };

    try {
      await customFetch.post(
        url,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      store.dispatch(clearCart());
      queryClient.removeQueries(['orders']);
      toast.success('Order placed successfully');
      return redirect('/orders');
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          'There was an error placing your order'
      );

      if (error.response?.status === 401 || error.response?.status === 403)
        return redirect('/login');

      return null;
    }
  };
}

function Checkout() {
  const cartTotal = useSelector(getCartTotal);
  if (cartTotal.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
}

export default Checkout;
