import { useState } from "react";

import DateSlider from "../DateSlider";

import keyData from "../../data/keys.json";
import data from "../../data/data.json";

import "./Aside.css";

const Aside = () => {
  const dates = data.data.map((dataItem) => dataItem.date);
  const [active, setActive] = useState("personnel");
  const [activeIndex, setActiveIndex] = useState(0);
  const keys = keyData.keys.slice(1);
  const activeDataItem: DataItem = data.data[activeIndex];
  const prevDataItem: DataItem = data.data[activeIndex + 1];

  const onClickHandler = (id: string) => () => {
    setActive(id);
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
            className={`card-item ${active === key.id ? "active" : ""}`}
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

interface DataItem {
  [key: string]: string | number | null;
}

export default Aside;
