export const getStartAndEndDateOfWeek = (week) => {
  const [year, weekNumber] = week.split("-W");

  const firstDayOfYear = new Date(year, 0, 1);
  const firstDayOfWeek = new Date(
    firstDayOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000
  );
  //we want a monday
  const dayOfWeek = firstDayOfWeek.getDay(); //sunday is 0 monday is 1
  const startOfWeek = new Date(firstDayOfWeek);
  startOfWeek.setDate(
    firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // handle sunday as first day of the week
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() - 6);

  const startDateFormatted = startOfWeek.toISOString().split("T")[0];
  const endDateFormatted = endOfWeek.toISOString().split("T")[0];
  return { startDate: endDateFormatted, endDate: startDateFormatted };
};

export const getMonthStartAndLastDate = (value) => {
  const [year, month] = value.split("-");

  const firstDate = new Date(year, month - 1, 1);

  const lastDate = new Date(year, month, 0);

  const firstDateFormatted = firstDate.toISOString().split("T")[0];
  const lastDateFormatted = lastDate.toISOString().split("T")[0];

  return { startDate: firstDateFormatted, endDate: lastDateFormatted };
};

export const getThisYearsFirstAndLastDate = (year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31);

  // Format the dates as 'YYYY-MM-DD'
  const firstDayFormatted = firstDayOfYear.toISOString().split("T")[0];
  const lastDayFormatted = lastDayOfYear.toISOString().split("T")[0];

  return { startDate: firstDayFormatted, endDate: lastDayFormatted };
};

export const getThisQuartersRange = () => {
  const month = new Date().getMonth() + 1;
  let start;
  let end;

  switch (true) {
    case month <= 3:
      start = `${new Date().getFullYear()}-01-01`;
      end = `${new Date().getFullYear()}-03-31`;
      break;
    case month <= 6:
      start = `${new Date().getFullYear()}-04-01`;
      end = `${new Date().getFullYear()}-06-30`;
      break;
    case month <= 9:
      start = `${new Date().getFullYear()}-07-01`;
      end = `${new Date().getFullYear()}-09-01`;
      break;
    default:
      start = `${new Date().getFullYear()}-10-01`;
      end = `${new Date().getFullYear()}-12-31`;
  }

  return { start, end };
};
