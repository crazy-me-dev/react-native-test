import { Review } from "./Review";

export type Product = {
  asin: string;
  title: string;
  image: string;
  reviews: Review[];
}

export type ProductItem = {
  asin: string;
  title: string;
  image: string;
  reviewsTotal: number;
  helpfulAver: number;
}