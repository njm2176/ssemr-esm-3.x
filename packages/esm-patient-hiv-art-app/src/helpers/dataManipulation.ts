export const processWaterfallData = (rawData) =>
  rawData.map((item, index) => ({
    ...item,
    y0: item.value[0],
    y1: item.value[1],
    value: item.value[1] - item.value[0],
  }));
