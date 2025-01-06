import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import customFetch from '../utils';
import { toast } from 'react-toastify';

const url = '/auth/local/register';

export async function action({ request }) {
  try {
    const data = Object.fromEntries(await request.formData());
    await customFetch.post(url, data);
    toast.success('account created successfully');
    return redirect('/login');
  } catch (error) {
    console.log(error?.response);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);
    return null;
  }
}

function Register() {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>

        <FormInput label="username" name="username" type="text" />
        <FormInput label="email" name="email" type="email" />
        <FormInput label="password" name="password" type="password" />

        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Register;
