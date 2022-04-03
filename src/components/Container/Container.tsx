import Main from "../Main";
import Aside from "../Aside";

import "./Container.css";

const Container = () => {
  return (
    <div className="container">
      <Aside />
      <Main />
    </div>
  );
};

export default Container;
