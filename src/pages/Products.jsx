import { Filters, PaginationContainer, ProductsContainer } from '../components';
import customFetch from '../utils';
/*
  new URL(request.url)
    * Tạo một đối tượng URL từ request.url.
    * Đối tượng URL giúp phân tích cấu trúc của URL (protocol, hostname, pathname, searchParams, v.v.).
  
  new URL(request.url).searchParams: Truy cập searchParams, một đối tượng URLSearchParams chứa các cặp key-value từ phần truy vấn của URL (những gì sau dấu ?).
  
  .entries(): entries() trên URLSearchParams trả về một iterator chứa các cặp [key, value].

  [...new URL(request.url).searchParams.entries()]: Dùng toán tử spread (...) để chuyển iterator thành một mảng các cặp [key, value].

  Object.fromEntries(): Chuyển đổi mảng các cặp [key, value] thành một đối tượng JavaScript.

  ==> Tạo ra một đối tượng chứa các tham số truy vấn dưới dạng key-value.
*/
const url = '/products';

function productsQuery(params) {
  const { search, page, category, company, sort, price, shipping } = params;

  return {
    queryKey: [
      'products',
      search ?? '',
      page ?? 1,
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false
    ],
    queryFn: () => customFetch(url, { params })
  };
}

export function loader(queryClient) {
  return async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
      ]);

      const res = await queryClient.ensureQueryData(productsQuery(params));
      const products = res.data.data;
      const meta = res.data.meta;

      return { products, meta, params };
    } catch (error) {
      console.log(error);
    }
  };
}

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;
