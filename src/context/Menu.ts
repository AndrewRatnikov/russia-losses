import { createContext } from "react";

const defaultState = {
  isOpen: false,
  toggleOpen: () => {},
};

const MenuContext = createContext<MenuContextModel>(defaultState);

interface MenuContextModel {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default MenuContext;
