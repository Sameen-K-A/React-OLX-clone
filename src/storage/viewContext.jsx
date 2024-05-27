import React, { createContext, useState } from "react";

const ViewContext = createContext();
const ViewContextProvider = ({ children }) => {
  const [viewProduct, setViewProduct] = useState(null);
  return (
    <ViewContext.Provider value={{ viewProduct, setViewProduct }}>
      {children}
    </ViewContext.Provider>
  );
};

export { ViewContext, ViewContextProvider };