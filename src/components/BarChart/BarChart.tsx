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

    svg.call(zoom);

    if (svg.selectAll("g").nodes().length) {
      svg.selectAll("g");
    } else {
      svg.append("g");
    }

    svg
      .attr("class", "bars")
      .attr("fill", "white")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date as string) as any)
      .attr("y", (d) => y(d[active] as number))
      .attr("height", (d) => y(0) - y(d[active] as number))
      .attr("width", x.bandwidth());

    function zoom(_svg: any) {
      const extent: [[number, number], [number, number]] = [
        [margin.left, margin.top],
        [width - margin.right, height - margin.top],
      ];

      _svg.call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );

      function zoomed(event: any) {
        x.range(
          [margin.left, width - margin.right].map((d) =>
            event.transform.applyX(d)
          )
        );
        _svg
          .selectAll(".bars rect")
          .attr("x", (d: any) => x(d.date))
          .attr("width", x.bandwidth());
      }
    }
  });

  return <svg ref={ref} />;
};

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  active: string;
}

export default BarChart;
