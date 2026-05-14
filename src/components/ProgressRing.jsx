export default function ProgressRing({ progress, isActive }) {
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="absolute left-[-20px]">
      {/* background */}
      <circle
        cx="8"
        cy="10"
        r={radius}
        stroke="white"
        strokeOpacity={isActive ? 0.2 : 0}
        strokeWidth="1"
        fill="none"
      />

      {/* progress */}
      <circle
        cx="8"
        cy="10"
        r={radius}
        stroke="white"
        strokeWidth="1"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={isActive ? offset : circumference}
        style={{
          transition: "stroke-dashoffset 0.1s linear",
        }}
      />

      <circle
        cx="8"
        cy="10"
        r="2"
        fill="white"
        fillOpacity={isActive ? 0.9 : 0}
      />
    </svg>
  );
}