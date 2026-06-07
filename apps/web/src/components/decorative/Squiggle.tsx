export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 160 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 15C13 3 24 3 34 15C44 27 55 27 65 15C75 3 86 3 96 15C106 27 117 27 127 15C137 3 148 3 157 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
