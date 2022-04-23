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
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const { width, height } = svg.node().getBoundingClientRect();

    const xRange = [margin.left, width - margin.right];
    const yRange = [height - margin.bottom, margin.top];

    const X = d3.map(data, (d) => d.date as string);

    const xDomain = new d3.InternSet(X);

    const xScale = d3.scaleBand(xDomain, xRange).padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[active] as any)])
      .nice()
      .range(yRange);

    const body = d3.select("body");
    const tooltip: any = d3.select(".plot-tooltip").node()
      ? d3.select(".plot-tooltip")
      : body
          .append("div")
          .style("pointer-events", "none")
          .attr("class", "plot-tooltip");

    svg
      .call(zoom)
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", () => {
        tooltip.style("display", "none").selectChildren().remove();
        d3.select(".line").style("stroke-width", 0);
      });

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
      .attr("x", (d) => xScale(d.date as string) as any)
      .attr("y", (d) => yScale(d[active] as number))
      .attr("height", (d) => yScale(0) - yScale(d[active] as number))
      .attr("width", xScale.bandwidth());

    svg
      .append("line")
      .attr("class", "line")
      .style("stroke", "#fff")
      .style("opacity", 0.33);

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
        xScale.range(
          [margin.left, width - margin.right].map((d) =>
            event.transform.applyX(d)
          )
        );
        _svg
          .selectAll(".bars rect")
          .attr("x", (d: any) => xScale(d.date))
          .attr("width", xScale.bandwidth());
      }
    }

    function pointermoved(event: any) {
      const [xCoordinate] = d3.pointer(event); // [x, y]
      const scale = d3.scaleQuantize(xDomain).domain(xRange);
      const xValue = scale(xCoordinate);

      svg
        .select(".line")
        .style("stroke-width", 2)
        .attr("x1", xCoordinate)
        .attr("x2", xCoordinate)
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom);

      const tooltipValue = data.find((d) => d.date === xValue)?.[active];

      tooltip
        .style("display", "block")
        .attr("class", "plot-tooltip")
        .style("padding", "2px")
        .style("position", "fixed")
        .style("background-color", "#fff")
        .style("border", "1px solid #000")
        .style("z-index", "9999")
        .html(() => {
          return `<div>${xValue}<br /><b>${tooltipValue}</b></div>`;
        });

      const { width: tooltipWidth, height: tooltipHeight } = tooltip
        .node()
        .getBoundingClientRect();

      let y = event.y + 15;
      let x = event.x + 15;

      if (x + tooltipWidth > windowWidth) {
        x = x - tooltipWidth - 15;
      }

      if (y + tooltipHeight > windowHeight) {
        y = y - tooltipHeight - 15;
      }

      tooltip.style("top", `${y}px`).style("left", `${x}px`);
    }
  });

  return <svg ref={ref} />;
};

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  active: string;
}

export default BarChart;
