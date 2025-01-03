import { Outlet } from 'react-router-dom';
import { Header, Navbar } from '../components';

function HomeLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element">
        <Outlet />
      </section>
      <footer>Footer</footer>
    </>
  );
}
export default HomeLayout;
