export const getDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  const year = date.getUTCFullYear();

  const formattedDate = `${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}.${year}`;

  return formattedDate;
};
