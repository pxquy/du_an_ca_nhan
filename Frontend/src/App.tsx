import "./App.css";
import { useRoutes } from "react-router";
import LayoutAdmin from "./Layouts/admin/Layout";
import LayoutClient from "./Layouts/Client/Layout";
import CategoriesPage from "./Pages/Categories/Categories";
import BooksPage from "./Pages/admin/Books/Books";
import AuthorsPage from "./Pages/admin/Authors/Authors";

function App() {
  const router = useRoutes([
    { path: "/", Component: LayoutClient },
    {
      path: "admin",
      Component: LayoutAdmin,
      children: [
        { path: "books", Component: BooksPage },
        { path: "categories", Component: CategoriesPage },
        { path: "authors", Component: AuthorsPage },
      ],
    },
  ]);
  return router;
}

export default App;
