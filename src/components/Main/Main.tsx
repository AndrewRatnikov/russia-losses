import { BarChart } from "../BarChart";

import data from "../../data/data.json";
import { ActiveItem } from "../Container/Container";

const Main = ({ activeItem }: { activeItem: ActiveItem }) => {
  const transformedData = transformData(data.data).reverse();

  return (
    <main>
      <BarChart data={transformedData} active={activeItem} />
    </main>
  );
};

function transformData(data: Array<{ [key: string]: number | string | null }>) {
  return data.map((item, index) => {
    return Object.keys(item).reduce(
      (obj, key) => ({
        ...obj,
        [key]:
          index === data.length - 1
            ? data[index][key]
            : getItem(data[index][key], data[index + 1][key]),
      }),
      {}
    );
  });
}

function getItem(cur: null | number | string, prev: null | number | string) {
  if (typeof cur === "string" || typeof prev === "string") {
    return cur;
  }

  if (!cur) {
    return prev;
  }

  if (!prev) {
    return cur;
  }

  return cur - prev;
}

export default Main;
