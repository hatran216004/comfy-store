import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}
export default HomeLayout;
