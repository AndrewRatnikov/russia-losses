import MenuIcon from "../../icons/menu.svg";

import { MenuContext } from "../../context";

import "./Header.css";

const Header = () => {
  return (
    <MenuContext.Consumer>
      {(state) => (
        <header className="header">
          <img
            src={MenuIcon}
            alt="menu"
            className="menu-icon"
            onClick={state.toggleOpen}
          />
          <h1>Combat losses of the enemy</h1>
        </header>
      )}
    </MenuContext.Consumer>
  );
};

export default Header;
