import { useState } from "react";

import Main from "../Main";
import Aside from "../Aside";

import "./Container.css";

const Container = () => {
  const [active, setActive] = useState("personnel");

  return (
    <div className="container">
      <Aside activeItem={active} selectActiveItem={setActive} />
      <Main activeItem={active} />
    </div>
  );
};

export default Container;
