import { useRef, useEffect } from "react";
import * as d3 from "d3";

const useD3 = (
  fn: (node: d3.Selection<any, null, null, undefined>) => void
) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      fn(d3.select(ref.current));
    }
  });

  return ref;
};

export default useD3;
