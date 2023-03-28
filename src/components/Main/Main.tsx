import { BarChart } from "../BarChart";

import data from "../../data/data.json";
import keys from "../../data/keys.json";
import { ActiveItem } from "../Container/Container";
import { addDays, transformData } from "./helpers";
import "./Main.css";
import { useState } from "react";

type Legend = "day" | "week" | "month";

const Main = ({ activeItem }: { activeItem: ActiveItem }) => {
  const [legend, setLegend] = useState<Legend>("day");

  const _keys = keys.keys.map((key) => key.id);
  const transformedData: any = addDays(
    transformData(data.data, _keys).reverse() as any,
    legend
  );

  const legendHandler = (predefinedLegend: Legend) => () => {
    setLegend(predefinedLegend);
  };

  return (
    <main className="main">
      <BarChart data={transformedData} active={activeItem} />
      <div className="legend">
        <span
          className={`legend-item ${legend === "day" ? "active" : ""}`}
          onClick={legendHandler("day")}
        >
          days
        </span>
        <span
          className={`legend-item ${legend === "week" ? "active" : ""}`}
          onClick={legendHandler("week")}
        >
          weeks
        </span>
        <span
          className={`legend-item ${legend === "month" ? "active" : ""}`}
          onClick={legendHandler("month")}
        >
          months
        </span>
      </div>
    </main>
  );
};

export default Main;
