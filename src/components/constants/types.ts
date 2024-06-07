export interface Comic {
  author?: string;
  comic_id: number;
  followed?: string;
  image_src?: any;
  liked?: string;
  name_comic: string;
  state: string;
  views?: bigint;
  createDate: Date;
  createDateChapter: Date;
  lastModifiedDateChapter: Date;
  lastModifiedDate: Date;
  genreList: string[];
  chapterList: string[];
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