interface waterfallParams {
  currentValue: {
    group: string;
    value: number;
    y0: number;
    y1: number;
  };
  previousValue: {
    group: string;
    value: number;
    y0: number;
    y1: number;
  };
}

export const renderWaterfallTooltip = ({
  currentValue,
  previousValue,
}: waterfallParams) => {
  let start = null;
  let end = null;

  switch (true) {
    case currentValue.y0 === 0 || currentValue.y1 > previousValue.y1:
      (start = currentValue.y0), (end = currentValue.y1);
      break;
    default:
      (start = currentValue.y1), (end = currentValue.y0);
  }

  return `start: ${start}, end: ${end}`;
};
