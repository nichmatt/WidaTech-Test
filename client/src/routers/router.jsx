import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "../layout/Layout";
import path from "path";
import AddInvoice from "../components/add-invoice/add-invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AddInvoice />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
export default router;
