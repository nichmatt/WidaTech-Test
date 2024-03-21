import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../stores/action/actionCreator";
import timestampToDate from "../../helper/date-converter";
import formatRupiah from "../../helper/convert-to-rupiah";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useLocation, useNavigate } from "react-router";

export default function ListInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSelector((state) => state.invoiceReducer);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices(page));
  }, [dispatch, location]);

  useEffect(() => {
    navigate("/invoice-card?p=" + page);
  }, [page]);

  return (
    <div>
      <div className="h-[60px] flex items-center rounded-t-lg border-b-[2px] border-b-[#4235f3]">
        <p className="text-[18px] m-2 font-semibold text-[#1a1a1a]">
          Invoice List
        </p>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-3 my-5">
        {data?.invoices?.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col justify-between shadow-md w-[350px] h-[250px] p-5"
          >
            <div>
              <p className="text-[24px] font-semibold text-[#303030]">
                {invoice.customerName}
              </p>
              <p className="text-[12px] text-[#303030]">
                {timestampToDate(invoice.date)}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[gray]">Notes:</p>
              <p className="text-[14px] text-[gray]">{invoice.notes}</p>
            </div>
            <div>
              <p className="text-[#303030] text-[14px]">
                Total: {formatRupiah(invoice.totalPrice)}
              </p>
              <p className="text-[#303030] text-[14px]">
                Salesperson:{" "}
                <span className="font-semibold">{invoice.salesPersonName}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-center items-center gap-5">
          <p>Page:</p>
          <Input
            type="number"
            className="w-[60px]"
            value={page}
            onChange={(e) => {
              if (+e.target.value > data.count) {
                setPage(data.count);
              } else if (+e.target.value < 1) {
                setPage(1);
              } else {
                setPage(e.target.value);
              }
            }}
          ></Input>
        </div>
      </div>
    </div>
  );
}
