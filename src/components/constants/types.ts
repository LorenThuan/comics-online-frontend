export interface Comic {
  author?: string;
  comic_id: number;
  followed?: number;
  image_src?: string;
  liked?: number;
  name_comic: string;
  state: string;
  views?: bigint;
  create_date: Date;
  create_date_chapter?: Date;
  last_modified_date_chapter?: Date;
  last_modified_date?: Date;
  genreList?: string[];
  chapterList?: string[];
}

export interface User {
  userId?: number;
  name?: string;
  email: string;
  password: string;
  // usernameEntity?: string;
  role: string;
}

export interface AuthLogin {
  name?: string;
}