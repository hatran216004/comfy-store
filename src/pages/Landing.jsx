import { FeaturedProducts, Hero } from '../components';
import customFetch from '../utils/index';

const url = '/products?featured=true';
export async function loader() {
  try {
    const res = await customFetch(url);
    const products = res.data.data;
    return { products };
  } catch (error) {
    console.log(error);
  }
}

export default function Landing() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  );
}
