const DotIcon = (
  { state, size = 24 }: {
    state: "OPEN" | "CLOSED" | "CONNECTING";
    size?: number;
  },
) => {
  const colors = {
    OPEN: "#4CAF50", // Smooth green
    CLOSED: "#F44336", // Smooth red
    CONNECTING: "#FFC107", // Smooth yellow
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill={colors[state]} stroke="none" />
    </svg>
  );
};

export default DotIcon;
