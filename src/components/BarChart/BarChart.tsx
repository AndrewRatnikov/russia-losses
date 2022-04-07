import d3 from "d3";

import { useD3 } from "../../hooks";

const BarChart = ({ data }: { data: any }) => {
  const ref = useD3((svg) => {
    console.log(data);
  });

  return <svg ref={ref} />;
};

export default BarChart;
