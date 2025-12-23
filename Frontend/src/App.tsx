import "./App.css";
import { useRoutes } from "react-router";
import LayoutAdmin from "./Layouts/admin/Layout";
import LayoutClient from "./Layouts/Client/Layout";
import CategoriesPage from "./Pages/admin/Categories/Categories";
import BooksPage from "./Pages/admin/Books/Books";
import AuthorsPage from "./Pages/admin/Authors/Authors";
import AddPage from "./Pages/admin/Books/Add";
import AddAuthor from "./Pages/admin/Authors/Add";
import AddCategory from "./Pages/admin/Categories/Add";
import EditPage from "./Pages/admin/Books/Edit";
import Login from "./Pages/Client/Login";
import Register from "./Pages/Client/Register";
import BookDetail from "./Pages/admin/Books/BookDetail";
import EditCategory from "./Pages/admin/Categories/Edit";
import EditAuthor from "./Pages/admin/Authors/Edit";
import DateBorrow from "./Pages/admin/DateBorrows/DateBorrow";
import AddDateBorrow from "./Pages/admin/DateBorrows/Add";
import EditDateBorrow from "./Pages/admin/DateBorrows/Edit";
import BorrowItems from "./Pages/admin/BorrowItems/BorrowItems";
import AddBorrowItem from "./Pages/admin/BorrowItems/Add";
import EditBorrowItem from "./Pages/admin/BorrowItems/Edit";
import DetailBorrowItem from "./Pages/admin/BorrowItems/Detail";

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
          children: [
            { path: "addBook", Component: AddPage },
            { path: "editBook/:id", Component: EditPage },
          ],
        },
        { path: "detailBook/:id", Component: BookDetail },
        {
          path: "categories",
          Component: CategoriesPage,
          children: [
            { path: "addCategory", Component: AddCategory },
            { path: "editCategory/:id", Component: EditCategory },
          ],
        },
        {
          path: "authors",
          Component: AuthorsPage,
          children: [
            { path: "addAuthor", Component: AddAuthor },
            { path: "editAuthor/:id", Component: EditAuthor },
          ],
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
            { path: "detailBorrowItem", Component: DetailBorrowItem },
            { path: "editBorrowItem/:id", Component: EditBorrowItem },
          ],
        },
      ],
    },
  ]);
  return router;
}

export default App;
