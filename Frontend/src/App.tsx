import "./App.css";
import { useRoutes } from "react-router";
import LayoutAdmin from "./Layouts/admin/Layout";
import LayoutClient from "./Layouts/Client/Layout";
import CategoriesPage from "./Pages/admin/Categories/Categories";
import BooksPage from "./Pages/admin/Books/Books";
import AuthorsPage from "./Pages/admin/Authors/Authors";
import Login from "./Pages/Client/Login";
import Register from "./Pages/Client/Register";
import EditAuthor from "./Pages/admin/Authors/Edit";
import DateBorrow from "./Pages/admin/DateBorrows/DateBorrow";
import AddDateBorrow from "./Pages/admin/DateBorrows/Add";
import EditDateBorrow from "./Pages/admin/DateBorrows/Edit";
import BorrowItems from "./Pages/admin/BorrowItems/BorrowItems";
import AddBorrowItem from "./Pages/admin/BorrowItems/Add";
import EditBorrowItem from "./Pages/admin/BorrowItems/Edit";
import Comments from "./Pages/admin/Comments/Comments";

function App() {
  const router = useRoutes([
    {
      path: "/",
      Component: LayoutClient,
      children: [
        { path: "login", Component: Login },
        { path: "register", Component: Register },
      ],
    },
    {
      path: "admin",
      Component: LayoutAdmin,
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
          children: [{ path: "editAuthor/:id", Component: EditAuthor }],
        },
        {
          path: "dateBorrows",
          Component: DateBorrow,
          children: [
            { path: "addDateBorrow", Component: AddDateBorrow },
            { path: "editDateBorrow/:id", Component: EditDateBorrow },
          ],
        },
        {
          path: "borrowItems",
          Component: BorrowItems,
          children: [
            { path: "addBorrowItem", Component: AddBorrowItem },
            { path: "editBorrowItem/:id", Component: EditBorrowItem },
          ],
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
