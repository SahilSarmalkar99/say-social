import { useRef } from "react";
import useDashedLineReveal from "../hooks/useDashedLineReveal";

export default function DashedSeparator() {
  const lineRef = useRef(null);

  useDashedLineReveal(lineRef);

  return (
    <div className="w-full py-8 overflow-hidden">
      <div
        ref={lineRef}
        className="h-px"
        style={{
          width: "100%",
          background:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 20px, transparent 25px, transparent 35px)",
        }}
      />
    </div>
  );
}