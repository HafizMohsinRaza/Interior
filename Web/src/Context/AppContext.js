import React, { useReducer, useState } from "react";

// dont change the name
export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [state, setState] = useState({
    isAuth: false,
    token: localStorage.getItem("token"),
  });

  // console.log(localStorage.getItem("token"))

  function handleLogin(token) {
    setState({
      ...state,
      isAuth: true,
      token: token,
    });
  }
  function handleLogout() {
    setState({
      ...state,
      isAuth: false,
      token: null,
    });
  }
  // you need to use context
  // fix code here
  return (
    <>
      <AppContext.Provider value={{ state, handleLogin, handleLogout }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppContextProvider;
