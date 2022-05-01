import { useState } from "react";
import { I18nextProvider } from "react-i18next";

import Container from "./Container";
import Header from "./Header";

import i18n from './i18n'

import { MenuContext } from "../context";

import "./App.css";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const togleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
}

export default App;
