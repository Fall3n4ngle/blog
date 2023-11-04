const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const formattedDate = `${months[month]} ${day
    .toString()
    .padStart(2, "0")}, ${year}`;

  return formattedDate;
};
