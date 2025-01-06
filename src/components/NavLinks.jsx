import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../features/user/userSlice';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' }
];

function NavLinks() {
  const user = useSelector(getUser);

  return (
    <>
      {links.map((link) => {
        if (!user && (link.url === 'checkout' || link.url === 'orders'))
          return null;

        return (
          <li key={link.id}>
            <NavLink to={link.url} className="capitalize">
              {link.text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}

export default NavLinks;
