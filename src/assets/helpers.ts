export function getFormattedDate(date: string) {
  let temp = new Date(date);
  return new Date( temp.getTime() + Math.abs(temp.getTimezoneOffset()*60000) ).toLocaleDateString();
}
