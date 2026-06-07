export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 140 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 24C32 12 67 12 103 24C114 28 124 33 136 41"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M118 15L136 41L104 45"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
