import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/login" end>
          login
        </NavLink>
        <NavLink to="/signup" end>
          signup
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
