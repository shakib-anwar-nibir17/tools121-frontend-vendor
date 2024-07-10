import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState('#0d6efd');
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageData, setPageData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        showSidebar,
        setShowSidebar,
        pageData,
        setPageData,
        currentPage,
        setCurrentPage,
        message,
        setMessage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
