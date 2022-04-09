import { useState, useMemo } from "react";

import DateSlider from "../DateSlider";

import keyData from "../../data/keys.json";
import data from "../../data/data.json";
import { AsideProps, DataItem, KeyData } from "./model";
import { ActiveItem } from "../Container/Container";

import "./Aside.css";

const Aside = ({ selectActiveItem, activeItem }: AsideProps) => {
  const dates = useMemo(() => data.data.map((dataItem) => dataItem.date), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const keys = keyData.keys.slice(1) as KeyData;
  const activeDataItem: DataItem = data.data[activeIndex];
  const prevDataItem: DataItem = data.data[activeIndex + 1];

  const onClickHandler = (id: ActiveItem) => () => {
    selectActiveItem(id);
  };

  return (
    <aside>
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
            <span>{key.nameEn}:</span>{" "}
            {activeDataItem[key.id] ? activeDataItem[key.id] : "-"}{" "}
            {!!prevDataItem &&
            activeDataItem[key.id] &&
            prevDataItem[key.id] &&
            (activeDataItem[key.id] as number) -
              (prevDataItem[key.id] as number)
              ? `(+${
                  (activeDataItem[key.id] as number) -
                  (prevDataItem[key.id] as number)
                })`
              : null}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
