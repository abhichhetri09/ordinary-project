import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
