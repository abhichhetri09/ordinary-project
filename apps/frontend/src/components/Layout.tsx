import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </>
  );
}
