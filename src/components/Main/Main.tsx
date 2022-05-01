import { BarChart } from "../BarChart";

import data from "../../data/data.json";
import keys from "../../data/keys.json"
import { ActiveItem } from "../Container/Container";

const Main = ({ activeItem }: { activeItem: ActiveItem }) => {
  const _keys = keys.keys.map(key => key.id)
  const transformedData = transformData(data.data, _keys).reverse();

  return (
    <main>
      <BarChart data={transformedData} active={activeItem} />
    </main>
  );
};

function transformData(
  data: Array<{ [key: string]: number | string | null | undefined }>,
  keys: Array<string>
) {
  return data.map((item, index) => {
    return keys.reduce(
      (obj, key) => ({
        ...obj,
        [key]: isValid(
          index === data.length - 1
            ? item[key]
            : getItem(item[key], data[index + 1][key])
        ),
      }),
      {}
    );
  });
}

function getItem(
  cur: null | number | string | undefined,
  prev: null | number | string | undefined
) {
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

function isValid(value: string | number | null | undefined): string | number {
  return value ? value : 0;
}

export default Main;
