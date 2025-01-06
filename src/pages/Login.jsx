import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import customFetch from '../utils';
import { loginUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const url = '/auth/local';

export const action = (store) => {
  return async ({ request }) => {
    try {
      const data = Object.fromEntries(await request.formData());
      const res = await customFetch.post(url, data);
      store.dispatch(loginUser(res.data));
      toast.success('Login successfully');
      return redirect('/');
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          'please double check your credentials'
      );
      return null;
    }
  };
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginAsGuestUser() {
    try {
      const res = await customFetch.post(url, {
        identifier: 'test@test.com',
        password: 'secret'
      });

      toast.success('Welcome guest user');
      dispatch(loginUser(res.data));
      navigate('/');
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          'please double check your credentials'
      );
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          label="email"
          name="identifier"
          type="email"
          defaultValue="test@test.com"
        />

        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-block uppercase"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
