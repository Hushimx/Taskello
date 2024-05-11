import React from "react";

export default function useId() {
  const count = React.useRef(0);
  function getId() {
    count.current = count.current + 1;
    return new Date().getTime() + count.current;
  }

  return [getId];
}
