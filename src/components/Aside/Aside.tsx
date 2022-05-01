import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import DateSlider from "../DateSlider";

import { MenuContext } from "../../context";

import { ActiveItem } from "../Container/Container";
import keyData from "../../data/keys.json";
import data from "../../data/data.json";
import { AsideProps, DataItem, KeyData } from "./model";

import "./Aside.css";

const Aside = ({ selectActiveItem, activeItem }: AsideProps) => {
  const dates = useMemo(() => data.data.map((dataItem) => dataItem.date), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const keys = keyData.keys.slice(1) as KeyData;
  const activeDataItem: DataItem = data.data[activeIndex];
  const prevDataItem: DataItem | undefined = data.data[activeIndex + 1];

  const onClickHandler = (id: ActiveItem) => () => {
    selectActiveItem(id);
  };

  const getDataItem = (id: ActiveItem): string =>
    activeDataItem[id] ? `${activeDataItem[id]}` : "-";
  const getDifferenceCurPrevDataItem = (id: ActiveItem): string | null => {
    if (
      !prevDataItem ||
      !activeDataItem[id] ||
      !prevDataItem[id] ||
      !(activeDataItem[id]! - prevDataItem[id]!)
    ) {
      return null;
    }

    return `(+${activeDataItem[id]! - prevDataItem[id]!})`;
  };

  return (
    <MenuContext.Consumer>
      {(state) => (
        <aside className={state.isOpen ? "open" : ""}>
          <ul className="card">
            <DateSlider
              dates={dates}
              setActive={setActiveIndex}
              active={activeIndex}
            />
            {keys.map((key) => (
              <li
                key={key.id}
                className={`card-item ${activeItem === key.id ? "active" : ""}`}
                onClick={onClickHandler(key.id)}
              >
                <span>{t(key.nameEn)}:</span> {getDataItem(key.id)}{" "}
                {getDifferenceCurPrevDataItem(key.id)}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </MenuContext.Consumer>
  );
};

export default Aside;
