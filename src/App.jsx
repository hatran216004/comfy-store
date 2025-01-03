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
import { loaderSingleProduct } from './pages/SingleProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorElement />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: loaderSingleProduct,
        errorElement: <ErrorElement />
      },
      { path: 'about', element: <About /> },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
