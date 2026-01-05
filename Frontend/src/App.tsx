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
import type { IUsers } from "./Types/user";
import { message } from "antd";
import Home from "./Pages/Client/Home";
import Authorization from "./Components/Auth/Authorization";

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    message.success("Bạn chưa đăng nhập");
    return null;
  }
  const decode = jwtDecode<IUsers>(token);
  const role = decode.role;

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
        <Authorization role={role} allowRole={["0"]}>
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
