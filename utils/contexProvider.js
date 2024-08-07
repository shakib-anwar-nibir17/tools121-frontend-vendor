import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState('#0d6efd');
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageData, setPageData] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState({});
  const [perpageCount, setPerpageCount] = useState(10);
  const [pageCount, setPageCount] = useState(0);

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
        setPerpageCount,
        perpageCount,
        pageCount,
        setPageCount
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
