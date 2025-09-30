export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug?: string;
  metadata?: string;
  body?: string;
  mainImage?: string; // or specify the correct type if it's not a string
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};
