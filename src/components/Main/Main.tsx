import { BarChart } from "../BarChart";

import data from "../../data/data.json";
import keys from "../../data/keys.json";
import { ActiveItem } from "../Container/Container";
import { addDays, transformData } from "./helpers";

const Main = ({ activeItem }: { activeItem: ActiveItem }) => {
  const _keys = keys.keys.map((key) => key.id);
  const transformedData: any = addDays(
    transformData(data.data, _keys).reverse() as any,
    "day"
  );

  return (
    <main>
      <BarChart data={transformedData} active={activeItem} />
    </main>
  );
};

export default Main;
