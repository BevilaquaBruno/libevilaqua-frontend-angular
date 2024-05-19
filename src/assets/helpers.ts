import { AuthorInterface } from "src/app/components/authors/author.interface";

export function getFormattedDate(date: string) {
  let temp = new Date(date);
  return new Date( temp.getTime() + Math.abs(temp.getTimezoneOffset()*60000) ).toLocaleDateString();
}

export function getAuthorListJoined(data: AuthorInterface[]) {
  return (data != undefined) ? data.map(a => { return a.name }).join(', ') : '';
}
