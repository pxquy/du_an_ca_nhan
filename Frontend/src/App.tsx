import "./App.css";
import "chart.js/auto";
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
import type { IToken } from "./Types/user";
import Authorization from "./Components/Auth/Authorization";
import Users from "./Pages/admin/Users/Users";
import Statistical from "./Pages/admin/Statisticals/Statistical";

function App() {
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode<IToken>(token).role : null;

  const router = useRoutes([
    {
      path: "/",
      Component: LayoutClient,
      children: [
        { path: "/", Component: Login },
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
        { path: "statistical", Component: Statistical },
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
