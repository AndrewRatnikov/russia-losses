import { useState } from "react";

import keyData from "../../data/keys.json";
import data from '../../data/data.json'

import "./Aside.css";

const Aside = () => {
  const [active, setActive] = useState("personnel");
  const activeData: {[key: string]: string | number | null}  = data.data[0]

  const onClickHandler = (id: string) => () => {
    setActive(id);
  };

  return (
    <aside>
      <ul className="card">
        {keyData.keys.map((key) => (
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
