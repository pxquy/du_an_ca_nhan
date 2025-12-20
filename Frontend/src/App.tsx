import "./App.css";
import { useRoutes } from "react-router";
import LayoutAdmin from "./Layouts/admin/Layout";
import LayoutClient from "./Layouts/Client/Layout";
import CategoriesPage from "./Pages/Categories/Categories";
import BooksPage from "./Pages/admin/Books/Books";
import AuthorsPage from "./Pages/admin/Authors/Authors";
import AddPage from "./Pages/admin/Books/Add";
import AddAuthor from "./Pages/admin/Authors/Add";
import AddCategory from "./Pages/Categories/Add";

function App() {
  const router = useRoutes([
    { path: "/", Component: LayoutClient },
    {
      path: "admin",
      Component: LayoutAdmin,
      children: [
        {
          path: "books",
          Component: BooksPage,
          children: [{ path: "addBook", Component: AddPage }],
        },
        {
          path: "categories",
          Component: CategoriesPage,
          children: [{ path: "addCategory", Component: AddCategory }],
        },
        {
          path: "authors",
          Component: AuthorsPage,
          children: [{ path: "addAuthor", Component: AddAuthor }],
        },
      ],
    },
  ]);
  return router;
}

export default App;
