import * as d3 from "d3";

import { useD3 } from "../../hooks";

import "./BarChart.css";

const margin = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 30,
};

const BarChart = ({ data, active }: BarChartProps) => {
  const ref = useD3((svg) => {
    const { width, height } = svg.node().getBoundingClientRect();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date as string))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[active] as any)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    if (svg.selectAll("g").nodes().length) {
      svg.selectAll("g");
    } else {
      svg.append("g").attr("class", "bars").attr("fill", "white");
    }

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date as string) as any)
      .attr("y", (d) => y(d[active] as number))
      .attr("height", (d) => y(0) - y(d[active] as number))
      .attr("width", x.bandwidth());
  });

  return <svg ref={ref} />;
};

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  active: string;
}

export default BarChart;
