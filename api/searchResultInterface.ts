export interface ResultInterface {
  error: boolean;
  errorMessage: string | null;
}

export interface PriceInterface {
  price: number;
  percentage: number;
  listPrice: number;
}
export interface RatingInterface {
  number: number | undefined;
  total: number | undefined;
}
export interface ColorLinksInterface {
  style: string;
  link: string;
}
export interface SorterInterface {
  title: string;
  selected: boolean;
  value: string;
}

export interface ValuesInterface {
  type: string;
  label: string;
  selected: boolean;
  value: string;
  items: number;
  style?: { [key: string]: string };
}
export interface PaginationInterface {
  label: string;
  value: string | null;
  link?: string | null;
}

export interface FilterInterface {
  label: string;
  filterName?: string;
  optionType: string;
  values: ValuesInterface[];
}

export interface ResultsInterface {
  sku?: string;
  name?: string;
  image?: string;
  prime?: boolean;
  bestSeller?: boolean;
  brand?: string;
  price?: PriceInterface;
  rating?: RatingInterface;
  colorLinks?: ColorLinksInterface[];
}

export interface SearchResultInterface extends ResultInterface {
  currentPage?: number;
  filter?: FilterInterface[];
  pageResultTotal?: number;
  pagination?: PaginationInterface[];
  results?: ResultsInterface[];
  sorter?: SorterInterface[];
}
