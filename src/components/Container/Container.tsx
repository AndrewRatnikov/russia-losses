import { useState } from "react";

import Main from "../Main";
import Aside from "../Aside";

import "./Container.css";

const Container = () => {
  const [active, setActive] = useState<ActiveItem>("personnel");

  return (
    <div className="container">
      <Aside activeItem={active} selectActiveItem={setActive} />
      <Main activeItem={active} />
    </div>
  );
};

export type ActiveItem =
  | "personnel"
  | "tanks"
  | "apv"
  | "artillerySystems"
  | "mlrs"
  | "aaws"
  | "aircraft"
  | "helicopters"
  | "vehicles"
  | "boatsCutters"
  | "fuelTanks"
  | "uav"
  | "specialEquipment"
  | "srbmSystem"
  | "cruiseMissiles";

export default Container;
