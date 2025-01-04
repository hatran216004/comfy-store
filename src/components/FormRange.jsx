import { useState } from 'react';
import { formatPrice } from '../utils';
import { useLoaderData } from 'react-router-dom';

function FormRange({ label, size, name }) {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const step = 1000;
  const maxPrice = 100000;
  const { params } = useLoaderData();
  const { price = 0 } = params;

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice || price)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice || price}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}

export default FormRange;
