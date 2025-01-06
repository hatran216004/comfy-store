import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import ErrorElement from './components/ErrorElement';
import { loader as loaderSingleProduct } from './pages/SingleProduct';
import { loader as loaderProducts } from './pages/Products';
import { action as registerAction } from './pages/Register';
import { loader as loaderCheckout } from './pages/Checkout';
import { loader as loaderOrders } from './pages/Orders';
import { action as actionAction } from './pages/Login';
import { action as actionCheckout } from './pages/Checkout';
import { store } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
      // staleTime: 0
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: 'products',
        element: <Products />,
        loader: loaderProducts(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: loaderSingleProduct(queryClient),
        errorElement: <ErrorElement />
      },
      { path: 'about', element: <About /> },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: loaderCheckout(store),
        action: actionCheckout(store, queryClient)
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: loaderOrders(store, queryClient),
        errorElement: <ErrorElement />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    action: actionAction(store),
    errorElement: <Error />
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
    errorElement: <Error />
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
