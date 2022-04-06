import { useRef, useEffect } from "react";
import d3 from "d3";

const useD3 = (
  fn: (node: d3.Selection<HTMLElement, null, null, undefined>) => void
) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      fn(d3.select(ref.current));
    }
  });

  return ref;
};

export default useD3;
