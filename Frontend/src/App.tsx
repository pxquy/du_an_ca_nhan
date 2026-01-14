import "./App.css";
import { useRoutes } from "react-router";
import LayoutAdmin from "./Layouts/admin/Layout";
import LayoutClient from "./Layouts/Client/Layout";
import CategoriesPage from "./Pages/admin/Categories/Categories";
import BooksPage from "./Pages/admin/Books/Books";
import AuthorsPage from "./Pages/admin/Authors/Authors";
import Login from "./Pages/Client/Login";
import Register from "./Pages/Client/Register";
import DateBorrow from "./Pages/admin/DateBorrows/DateBorrow";
import BorrowItems from "./Pages/admin/BorrowItems/BorrowItems";
import Comments from "./Pages/admin/Comments/Comments";
import { jwtDecode } from "jwt-decode";
import type { IToken, IUsers } from "./Types/user";
import { message } from "antd";
import Home from "./Pages/Client/Home";
import Authorization from "./Components/Auth/Authorization";
import Users from "./Pages/admin/Users/Users";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode<IToken>(token).role : null;

  const router = useRoutes([
    {
      path: "/",
      Component: LayoutClient,
      children: [
        { path: "/", Component: Home },
        { path: "login", Component: Login },
        { path: "register", Component: Register },
      ],
    },
    {
      path: "admin",
      element: (
        <Authorization role={role || ""} allowRole={["0"]}>
          <LayoutAdmin />
        </Authorization>
      ),
      children: [
        {
          path: "books",
          Component: BooksPage,
        },
        {
          path: "categories",
          Component: CategoriesPage,
        },
        {
          path: "authors",
          Component: AuthorsPage,
        },
        {
          path: "users",
          Component: Users,
        },
        {
          path: "dateBorrows",
          Component: DateBorrow,
        },
        {
          path: "borrowItems",
          Component: BorrowItems,
        },
        {
          path: "comments",
          Component: Comments,
        },
      ],
    },
  ]);
  return router;
}

export default App;
