import { useEffect, useState } from "react";
import {
  DashboardOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Route, useLocation, useNavigate } from "react-router";

export default function SideNav() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [pages] = useState([
    { name: "Add Invoice", path: "/", icon: <PlusOutlined /> },
    {
      name: "List Invoice",
      path: "/invoice-card",
      icon: <OrderedListOutlined />,
    },
    { name: "Dashboard", path: "/dashboard", icon: <DashboardOutlined /> },
  ]);

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="m-1">
      {pages.map((el) => (
        <div
          key={el}
          className={`flex 
          gap-3 justify-start items-center text-[14px] font-normal text-[#1b1b1b] p-3 pl-5 m-1 hover:text-[#4235f3] cursor-pointer hover:bg-[lightgray] rounded-md transition-all ${
            path === el.path ? "bg-[#4235f3] text-white" : null
          }`}
          onClick={() => {
            navigate(el.path);
          }}
        >
          <div className="mt-1">{el.icon}</div>
          <div className="mt-1">{el.name}</div>
        </div>
      ))}
    </div>
  );
}
