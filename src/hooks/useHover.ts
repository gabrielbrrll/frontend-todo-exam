import { useState, useRef, useEffect } from "react";

function useHover<T>() {
  const [value, setValue] = useState<boolean>(false); 
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = (): void => setValue(true);
  const handleMouseLeave = (): void => setValue(false);
  
  useEffect(
    () => {
      const node: any = ref.current;
      console.log(node, 'node')
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current]
  );
  return [ref, value];
}

export default useHover