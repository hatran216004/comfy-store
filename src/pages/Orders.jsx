import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  OrdersList,
  SectionTitle,
  ComplexPaginationContainer
} from '../components';
import customFetch from '../utils';

const url = '/orders';

function allOrdersQuery(params, user) {
  const page = Number(params.page);

  return {
    queryKey: ['orders', page ? page : 1, user.username],
    queryFn: () =>
      customFetch(url, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
  };
}

export function loader(store, queryClient) {
  return async ({ request }) => {
    const user = store.getState().user.user;
    if (!user) {
      toast.error('Please login to access this route');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);

    try {
      const res = await queryClient.ensureQueryData(
        allOrdersQuery(params, user)
      );
      const { data: orders, meta } = res.data;
      return { orders, meta };
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

function Orders() {
  const { meta } = useLoaderData();
  if (meta.pagination.pageCount < 1)
    return <SectionTitle text="Please make an order" />;

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}

export default Orders;
