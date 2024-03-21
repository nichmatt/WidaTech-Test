import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoices } from "../stores/action/actionCreator";
import { useSelector } from "react-redux";
import ListInvoice from "../components/List-Invoice/list-invoice";

export default function ListInvoicePages() {
  return (
    <div className="m-5">
      <ListInvoice />
    </div>
  );
}
