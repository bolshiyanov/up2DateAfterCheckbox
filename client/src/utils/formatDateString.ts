export function formatDateString(date: Date | string) {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  const formattedString = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedString;
}
