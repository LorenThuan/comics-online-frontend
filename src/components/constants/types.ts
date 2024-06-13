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
  username: string;
  email: string;
  password: string;
  role: "ROLE_USER";
}

export interface AuthLogin {
  username?: string;
}