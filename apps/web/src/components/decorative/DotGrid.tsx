export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 36 }).map((_, index) => {
        const x = 12 + (index % 6) * 14;
        const y = 12 + Math.floor(index / 6) * 14;
        return <circle cx={x} cy={y} fill="currentColor" key={index} r="1.4" />;
      })}
    </svg>
  );
}
