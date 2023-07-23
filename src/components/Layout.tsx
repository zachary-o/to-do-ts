import { FC } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import { ICategoryProps } from "../interfaces";

const Layout: FC<ICategoryProps> = ({ allCategories, setAllCategories }) => {
  return (
    <div className="layout-container">
      <SideBar
        allCategories={allCategories}
        setAllCategories={setAllCategories}
      />
      <Outlet />
    </div>
  );
};
export default Layout;
