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
  return { startDate: startDateFormatted, endDate: endDateFormatted };
};

export const getThisYearsFirstAndLastDate = (year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31);

  // Format the dates as 'YYYY-MM-DD'
  const firstDayFormatted = firstDayOfYear.toISOString().split("T")[0];
  const lastDayFormatted = lastDayOfYear.toISOString().split("T")[0];

  return { startDate: firstDayFormatted, endDate: lastDayFormatted };
};
