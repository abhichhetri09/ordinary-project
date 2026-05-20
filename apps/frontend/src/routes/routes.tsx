import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./home";

export const appRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
];
