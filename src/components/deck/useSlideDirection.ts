"use client";
import { useEffect, useRef, useState } from "react";

/** Which way the deck last moved (1 forward, -1 back) and whether it has moved at all yet. */
export function useSlideDirection(slide: number) {
  const previous = useRef(slide);
  const [state, setState] = useState({ dir: 1, moved: false });
  if (previous.current !== slide) {
    const dir = slide > previous.current ? 1 : -1;
    previous.current = slide;
    setState({ dir, moved: true });
  }
  useEffect(() => {
    previous.current = slide;
  }, [slide]);
  return state;
}
