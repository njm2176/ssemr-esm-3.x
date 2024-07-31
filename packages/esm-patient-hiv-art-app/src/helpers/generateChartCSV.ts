export const generateChartCSV = ({ rows, fileName }) => {
  const data = [
    [
      "Name",
      "Sex",
      "Date enrolled",
      "Last Refill Date",
      "Contact",
      "Village",
      "Land Mark",
    ],
  ];
  rows.forEach((row) => {
    const values = [
      row.name,
      row.sex,
      row.dateEnrolled,
      row.lastRefillDate,
      row.contact,
      row.landMark,
      row.village,
    ];
    data.push(values);
  });

  let csv = "";
  data.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
};
