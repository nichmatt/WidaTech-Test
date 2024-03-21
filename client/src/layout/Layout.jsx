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
          <div className="min-w-[300px] shadow-md h-[90vh] pt-3 ">
            <SideNav />
          </div>
          <div className="no-scrollbar h-[90vh] min-w-[1000px] overflow-auto">
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
