import { BookInterface } from "../book/book.interface";
import { PersonInterface } from "../person/person.interface";

export interface LoanInterface {
  id: number;
  description: string;
  return_date: string | null;
  must_return_date: string | null;
  loan_date: string | null;
  book: BookInterface;
  person: PersonInterface;
}

export interface LoanListInterface {
  data: LoanInterface[];
  count: number;
}


export interface LoanDeleteInterface {
  affected: number,
  raw: any[]
}

export interface LoanCreateInterface {
  description: string;
  return_date: string | null;
  must_return_date: string | null;
  loan_date: string | null;
  bookId: number;
  personId: number;
}

export interface LoanUpdateInterface {
  id: number;
  description: string;
  return_date: string | null;
  must_return_date: string | null;
  loan_date: string | null;
  bookId: number;
  personId: number;
}

export interface LoanFiltersRaw {
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  book?: number | null;
  person?: number | null;
  returned?: boolean | null;
}

export interface LoanFiltersToString {
  data: {
    description?: string,
    start_date?: string,
    end_date?: string,
    book?: string,
    person?: string,
    returned?: string,
  }
}
