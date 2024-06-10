import { useState } from "react";

export const useCascade = () => {
  const [scale, setScale] = useState([]);

  const roundToNearestFactorOfFive = (num) => Math.round(num / 5) * 5;

  const generateScale = ({ dataset }) => {
    if (dataset?.length === 0) return null;

    const minValue = roundToNearestFactorOfFive(
      Math.min(...dataset.map((d) => d.total))
    );
    const maxValue = roundToNearestFactorOfFive(
      Math.max(...dataset.map((d) => d.total))
    );

    const range = maxValue - minValue;
    const numSteps = 6;
    const stepSize = range / (numSteps - 1);

    const scale = [];
    for (let i = 0; i <= numSteps; i++) {
      setScale((prev) => [...prev, minValue + (i * stepSize)]);
    }

    return scale;
  };

  return { generateScale, scale };
};
