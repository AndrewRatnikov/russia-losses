import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BarChart } from "../BarChart";

import data from "../../data/data.json";
import keys from "../../data/keys.json";
import { ActiveItem } from "../Container/Container";
import { addDays, transformData } from "./helpers";
import "./Main.css";

type Legend = "day" | "week" | "month" | "year";

const Main = ({ activeItem }: { activeItem: ActiveItem }) => {
  const [legend, setLegend] = useState<Legend>("day");
  const { t } = useTranslation();

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
          {t("days")}
        </span>

        <span
          className={`legend-item ${legend === "week" ? "active" : ""}`}
          onClick={legendHandler("week")}
        >
          {t("weeks")}
        </span>

        <span
          className={`legend-item ${legend === "month" ? "active" : ""}`}
          onClick={legendHandler("month")}
        >
          {t("months")}
        </span>

        <span
          className={`legend-item ${legend === "year" ? "active" : ""}`}
          onClick={legendHandler("year")}
        >
          {t("years")}
        </span>
      </div>
    </main>
  );
};

export default Main;
