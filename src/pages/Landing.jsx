import { FeaturedProducts, Hero } from '../components';
import customFetch from '../utils/index';

const url = '/products?featured=true';
export async function loader() {
  try {
    const res = await customFetch(url);
    return res.data;
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
