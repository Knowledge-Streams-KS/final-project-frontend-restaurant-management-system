import React from "react";
import Sidebar from "./sidebar";

const LayoutTemplate = ({ children }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default LayoutTemplate;
