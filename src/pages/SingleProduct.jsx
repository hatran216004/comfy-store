import { Link, useLoaderData } from 'react-router-dom';
import customFetch, { formatPrice } from '../utils/index';
import { useState } from 'react';

export async function loaderSingleProduct({ params }) {
  try {
    const res = await customFetch(`/products/${params.id}`);
    const product = res.data.data;
    return product;
  } catch (error) {
    console.log(error);
  }
}

function SingleProduct() {
  const product = useLoaderData();
  const { image, title, price, company, description, colors } =
    product.attributes;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const dollarsAmount = formatPrice(price);

  function handleAmount({ target }) {
    setAmount(target.value);
  }

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarsAmount}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => alert('add to bag')}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
