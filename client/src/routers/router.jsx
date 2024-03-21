import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AddInvoice from "../components/add-invoice/add-invoice";
import ListInvoice from "../pages/list-invoice";
import ListInvoicePages from "../pages/list-invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AddInvoice />,
      },
      {
        path: "/invoice-card",
        element: <ListInvoicePages />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
export default router;
