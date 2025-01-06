import { Form } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { getUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

function CheckoutForm() {
  const user = useSelector(getUser);
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput
        label="first name"
        name="name"
        type="text"
        defaultValue={user.username}
      />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
}

export default CheckoutForm;
