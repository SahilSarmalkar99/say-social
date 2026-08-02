export default function FolderCard({
  children,
  variant = "left",
  fill = "#01012A",
  stroke = "rgba(255,255,255,.2)",
}) {
  const isLeft = variant === "left";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* SVG Background */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        {isLeft ? (
          <path
            d="
              M40 70
              H650
              Q675 70 700 35
              H930
              Q970 35 970 80
              V650
              Q970 690 930 690
              H40
              Q0 690 0 650
              V110
              Q0 70 40 70
              Z
            "
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        ) : (
          <path
            d="
              M70 35
              H300
              Q325 70 360 70
              H960
              Q1000 70 1000 110
              V650
              Q1000 690 960 690
              H40
              Q0 690 0 650
              V80
              Q0 35 70 35
              Z
            "
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        )}
      </svg>

      {/* Content Layer */}

      <div
  className="relative z-10 h-full overflow-hidden"
  style={{
    clipPath:
      variant === "left"
        ? "polygon(0% 10%, 65% 10%, 71% 0%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 28% 0%, 35% 10%, 100% 10%, 100% 100%, 0% 100%)",
  }}
>
  {children}
</div>
    </div>
  );
}