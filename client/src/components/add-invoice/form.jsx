import { Input, notification } from "antd";
import { useEffect, useState } from "react";
import products from "../../assets/product-data/product.json";
import ProductList from "./product-list";
import { stringOfSelectedProduct } from "../../helper/string-of-selected-product";
import formatRupiah from "../../helper/convert-to-rupiah";

export default function FormInvoice() {
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [salesPersonName, setSalesPersonName] = useState("");
  const [notes, setNotes] = useState("");
  const [product, setProduct] = useState("");
  const [productData, setProductData] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleSalesPersonNameChange = (e) => {
    setSalesPersonName(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const openNotification = (placement) => {
    api.warning({
      message: <p className="font-semibold">Failed to submit</p>,
      description: <>Please insert the mandatory fields</>,
      placement,
    });
  };

  const onClickProduct = (payload) => {
    let catcher = false;
    let data = selectedProduct?.map((item) => {
      if (+item.id === +payload.id) {
        item.qty += 1;
        catcher = true;
      }
      return item;
    });
    if (!catcher) {
      data = [...selectedProduct, { ...payload, qty: 1 }];
    }
    setSelectedProduct(data);
    setProduct("");
  };
  const onSubmit = () => {
    if (!name.trim() || !customerName.trim() || !salesPersonName.trim()) {
      openNotification("top");
    } else {
      const payload = {
        name,
        customerName,
        salesPersonName,
        product: stringOfSelectedProduct(selectedProduct),
        notes,
      };
      console.log(payload);
    }
  };

  useEffect(() => {
    if (product === "") {
      setProductData([]);
    } else {
      setProductData(
        products.filter((item) =>
          item.name.toLowerCase().includes(product.toLowerCase())
        )
      );
    }
  }, [product]);
  return (
    <>
      {contextHolder}
      <div className="w-[80vw] flex gap-5">
        <div className="w-[50%]">
          <div className=" h-[60px] flex items-center rounded-t-lg border-b-[2px] border-b-[#4235f3]">
            <p className="text-[18px] m-2 font-semibold text-[#1a1a1a]">
              Generate Invoice
            </p>
          </div>
          <div className="flex flex-col my-5 gap-3">
            <div>
              <p className="text-[14px] text-[#3b3b3b] m-1">
                Name <span className="text-[red]">*</span>
              </p>
              <Input
                placeholder="Please insert invoice name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <p className="text-[14px] text-[#3b3b3b] m-1">
                Customer name <span className="text-[red]">*</span>
              </p>
              <Input
                placeholder="Please insert customer name"
                value={customerName}
                onChange={handleCustomerNameChange}
              />
            </div>
            <div>
              <p className="text-[14px] text-[#3b3b3b] m-1">
                Salesperson name <span className="text-[red]">*</span>
              </p>
              <Input
                placeholder="Please insert salesperson name"
                value={salesPersonName}
                onChange={handleSalesPersonNameChange}
              />
            </div>
            <div>
              <p className="text-[14px] text-[#3b3b3b] m-1">Notes </p>
              <Input.TextArea
                placeholder="Please insert note"
                value={notes}
                onChange={handleNotesChange}
              />
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <div className=" h-[60px] flex items-center rounded-t-lg border-b-[2px] border-b-[#4235f3]">
            <p className="text-[18px] m-2 font-semibold text-[#1a1a1a]">
              Product
            </p>
          </div>
          <div className="my-5">
            <p className="text-[14px] text-[#3b3b3b] m-1">Search product</p>
            <div className="flex gap-2">
              <Input
                placeholder="What Product you are looking for?"
                value={product}
                onChange={handleProductChange}
              />
            </div>
            <div className="border-[1px] border-[#dcdcdc]">
              {productData.map((item) => (
                <div
                  key={item}
                  className="h-[70px] flex gap-3 justify-between items-center p-3 hover:bg-[lightgray] cursor-pointer transition-all"
                  onClick={() => {
                    onClickProduct(item);
                  }}
                >
                  <div className="flex justify-center items-center gap-5">
                    <div>
                      <img
                        src={item.picture}
                        alt=""
                        style={{ width: "40px" }}
                      />
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
                      <p className="text-[14px] text-[gray]">
                        Stock: {item.stock}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductList selectedProduct={selectedProduct} />
      </div>
      <div className=" ">
        <div className="w-[100%] my-5">
          <div className="border-b-[1px] border-[#4235f3] my-2"></div>
          <div className="flex justify-end">
            <p
              className="p-2 bg-[#4235f3] w-[100px] text-center font-semibold rounded-md text-white hover:bg-[lightgray] cursor-pointer transition-all"
              onClick={onSubmit}
            >
              Submit
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
