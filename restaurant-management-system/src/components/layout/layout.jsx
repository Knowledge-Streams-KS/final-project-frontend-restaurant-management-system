import React from "react";
import AdminSidebar from "./admin";
import WaiterSidebar from "./waiter";
import ChefSidebar from "./chef";

const LayoutTemplate = ({ children, role }) => {
  let SidebarComponent;

  switch (role) {
    case "admin":
      SidebarComponent = AdminSidebar;
      break;
    case "waiter":
      SidebarComponent = WaiterSidebar;
      break;
    case "chef":
      SidebarComponent = ChefSidebar;
      break;
    default:
      SidebarComponent = () => <div>No Sidebar Available</div>;
  }

  return (
    <div>
      <SidebarComponent>{children}</SidebarComponent>
    </div>
  );
};

export default LayoutTemplate;
