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
  const activeData: { [key: string]: string | number | null } =
    data.data[activeIndex];

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
            <span>{key.nameEn}:</span> {activeData[key.id]}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
