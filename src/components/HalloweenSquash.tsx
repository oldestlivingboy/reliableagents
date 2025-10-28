import { useState } from "react";

interface SquashProps {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const HalloweenSquash = ({ position }: SquashProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed z-40 text-2xl cursor-pointer transition-transform hover:scale-110 ${
        isAnimating ? "animate-[spin_0.6s_ease-in-out,scale-in_0.3s_ease-out]" : ""
      }`}
      style={position}
      aria-label="Halloween squash decoration"
    >
      🎃
    </button>
  );
};

export default HalloweenSquash;
