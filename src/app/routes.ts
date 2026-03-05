import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Celebration } from "./pages/Celebration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/celebration",
    Component: Celebration,
  },
], {
  basename: "/BirthdayWish/",
});
