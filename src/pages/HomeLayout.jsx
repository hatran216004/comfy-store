import { Outlet } from 'react-router-dom';
import { Header } from '../components';

function HomeLayout() {
  return (
    <>
      <Header />
      <section className="align-element">
        <Outlet />
      </section>
      <footer>Footer</footer>
    </>
  );
}
export default HomeLayout;
