import MenuIcon from "../../icons/menu.svg";

import { MenuContext } from "../../context";

import { useTranslation } from "react-i18next";

import "./Header.css";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => () => {
    i18n.changeLanguage(lang);
  };

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
          <h1>{t("The total combat losses of the enemy")}</h1>
          <div className="lang">
            <button
              className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
              type="button"
              onClick={changeLang("en")}
            >
              EN
            </button>
            <button
              className={`lang-btn ${i18n.language === "ua" ? "active" : ""}`}
              type="button"
              onClick={changeLang("ua")}
            >
              UA
            </button>
          </div>
        </header>
      )}
    </MenuContext.Consumer>
  );
};

export default Header;
