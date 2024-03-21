function getMonthName(dateString) {
  const [year, month] = dateString.split("-");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[parseInt(month, 10) - 1];

  return `${monthName} ${year}`;
}

module.exports = { getMonthName };
