import { AuthorInterface } from "../authors/author.interface";
import { GenreInterface } from "../genre/genre.interface";
import { PublisherInterface } from "../publishers/publisher.interface";
import { TagInterface } from "../tags/tag.interface";
import { TypeInterface } from "../types/type.interface";

export interface BookInterface {
  id: number;
  title: string;
  edition: number | null;
  isbn: string | null;
  number_pages: number | null;
  release_year: number | null;
  obs: string | null;
  genre: GenreInterface | null;
  publisher: PublisherInterface | null;
  type: TypeInterface | null;
  tags: TagInterface[];
  authors: AuthorInterface[];
}

export interface BookListInterface {
  data: BookInterface[];
  count: number;
}


export interface BookDeleteInterface {
  affected: number,
  raw: any[]
}

export interface BookCreateInterface {
  title: string;
  edition: number | null;
  isbn: string | null;
  number_pages: string | null;
  release_year: number | null;
  obs: string | null;
  genreId: number | null;
  publisherId: number | null;
  typeId: number | null;
  tags: {id: number}[];
  authors: {id: number}[];
}

export interface BookUpdateInterface {
  id: number;
  title: string | null;
  edition: number | null;
  isbn: string | null;
  number_pages: number | null;
  release_year: number | null;
  obs: string | null;
  genreId: number | null
  publisherId: number | null;
  typeId: number | null;
  tags: {id: number}[];
  authors: {id: number}[];
}

export interface BookUpdateResponseInterface {
  raw: any[]
  affected: number;
}

export interface BookFiltersRaw {
  tags?: number[];
  authors?: number[];
  types?: number[];
  publishers?: number[];
  genres?: number[];
  number_pages?: number[];
  release_year?: number | null;
  isbn?: string | null;
  edition?: number | null;
  title?: string | null;
}

export interface BookFiltersToString {
  data: {
    tags?: string,
    authors?: string,
    types?: string,
    publishers?: string,
    genres?: string,
    number_pages?: string,
    release_year?: string,
    isbn?: string,
    edition?: string,
    title?: string,
  }
}

