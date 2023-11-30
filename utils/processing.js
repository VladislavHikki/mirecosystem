/**
 *
 * @param {Date} date
 * @returns
 */
export function processingDate(date) {
  let newDate = date ? new Date(date) : false;
  newDate = newDate
    ? `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`
    : false;
  return (newDate = newDate ? newDate : undefined);
}
