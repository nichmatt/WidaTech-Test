import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AddInvoice from "../components/add-invoice/add-invoice";
import ListInvoicePages from "../pages/list-invoice";
import MyChartPages from "../pages/dashboard.pages";

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
      {
        path: "/dashboard",
        element: <MyChartPages />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
export default router;
