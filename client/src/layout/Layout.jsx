import { Outlet } from "react-router-dom";
import Navbar from "../components/reuseable/navbar";
import SideNav from "../components/reuseable/sidenav";

function Layout() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="h-[10vh]">
          <Navbar />
        </div>
        <div className="flex w-screen">
          <div className="min-w-[300px] w-[15%] shadow-md h-[90vh] pt-3 ">
            <SideNav />
          </div>
          <div className="h-[90vh] min-w-[1000px] w-[85%] overflow-auto">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
