import Container from "./Container";
import Header from "./Header";

import { MenuContext } from "../context";

import "./App.css";
import { useState } from "react";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const togleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
    console.log(isMenuOpen)
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen: isMenuOpen,
        toggleOpen: togleMenuOpen,
      }}
    >
      <div className="app">
        <Header />
        <Container />
      </div>
    </MenuContext.Provider>
  );
}

export default App;
