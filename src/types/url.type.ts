export type CreateURLParams = {
  expiresIn: string;
  password: string;
  longUrl: string;
  customUrl: string;
};

export type Link = {
  id: number;
  originalUrl: string;
  createdAt: string;
  shortUrl: string;
  expiresIn: string;
  views: number;
};
