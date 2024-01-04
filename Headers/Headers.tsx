import React, { PropsWithChildren } from "react";

const Headers: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return <div className="text_heading">{children}</div>;
};

export default Headers;
