import { FeaturedProducts, Hero } from '../components';
import customFetch from '../utils/index';

/*
  * Loader đảm bảo dữ liệu đã được tải trước khi route tương ứng được hiển thị.
  * queryClient.ensureQueryData để đảm bảo dữ liệu luôn sẵn sàng trước khi loader trả vềc
  * queryClient.ensureQueryData kiểm tra xem dữ liệu của truy vấn với queryKey: ['featuredProducts'] đã có trong cache chưa:
  Nếu đã có, nó trả về dữ liệu từ cache.
  Nếu chưa có, nó thực thi queryFn để fetch dữ liệu từ server và lưu vào cache.
 */

const url = '/products?featured=true';
const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url)
};

export function loader(queryClient) {
  return async () => {
    try {
      const res = await queryClient.ensureQueryData(featuredProductsQuery);
      const products = res.data.data;
      return { products };
    } catch (error) {
      console.log(error);
    }
  };
}

export default function Landing() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  );
}
