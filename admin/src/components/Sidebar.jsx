import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../../frontend/src/assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen overflow-hidden border-r-2">
      <div className="w-[20rem] pt-10 pl-5 flex flex-col gap-5">
        <NavLink className="flex items-center gap-5 border-2 p-2" to="/add">
          <img className="w-5 h-5" src={assets.cross_icon} alt="add icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink className="flex items-center gap-5 border-2 p-2" to="/list">
          <img className="w-5 h-5" src={assets.cross_icon} alt="add icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink className="flex items-center gap-5 border-2 p-2" to="/orders">
          <img className="w-5 h-5" src={assets.cross_icon} alt="add icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
