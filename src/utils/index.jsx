import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://strapi-store-server.onrender.com/api'
});

export default customFetch;

export function formatPrice(price) {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
}

export function generateAmountOptions(number) {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option value={amount} key={amount}>
        {amount}
      </option>
    );
  });
}
