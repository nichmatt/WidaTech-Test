import formatRupiah from "../../helper/convert-to-rupiah";
import { totalPrice } from "../../helper/total-price";

/* eslint-disable react/prop-types */
export default function ProductList(props) {
  const { selectedProduct } = props;

  return (
    <>
      <div>
        <div className=" h-[60px] flex items-center rounded-t-lg border-b-[2px] border-b-[#afafaf]">
          <p className="text-[18px] m-2 font-semibold text-[#1a1a1a]">
            Product List
          </p>
        </div>
        <div>
          {selectedProduct &&
            selectedProduct.map((item) => (
              <div
                key={item}
                className="h-[70px] flex gap-3 justify-between items-center p-3 hover:bg-[lightgray] cursor-pointer transition-all"
                onClick={() => {
                  // onClickProduct(item);
                }}
              >
                <div className="flex justify-center items-center gap-5">
                  <div>
                    <img src={item.picture} alt="" style={{ width: "40px" }} />
                  </div>
                  <div className="">
                    <p className="text-[16px] font-semibold text-[#212121]">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>
                    <p className="text-[14px] text-[gray]">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[gray]">Qty: {item.qty}</p>
                  </div>
                </div>
              </div>
            ))}
          <div className="flex justify-end m-5">
            <p className="text-[15px] text-[1e1e1e] font-semibold">
              Total: {formatRupiah(totalPrice(selectedProduct))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
