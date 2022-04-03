import data from "../../data/keys.json";

import './Aside.css'

const Aside = () => {
  return (
    <aside>
      <ul className="card">
        {data.keys.map((key) => (
          <li>{key.nameEn}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
