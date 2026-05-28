import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./home";
import { Auth } from "../components/auth/Auth";
import { SignUp } from "../components/auth/SignUp";
import { EditUser } from "./editUser";

export const appRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Auth /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/user/:id/edit", element: <EditUser /> },
    ],
  },
];
