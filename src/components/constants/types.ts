export interface Comic {
  author?: string;
  comicId?: number | any;
  nameComic?: string;
  followed?: number;
  image_src?: string;
  liked?: number;
  state?: string;
  views?: bigint;
  createDate?: Date;
  createDateChapter?: Date;
  lastModifiedDateChapter?: Date;
  lastModifiedDate?: Date;
  genreList?: string[] | { genreId?: number; genre?: string; }[];
  chapterList?: string[] | { chapterId?: number; chapterNumber: string; createDate?: Date; lastModifiedDate?: Date }[];
  chapterNumber?: number;
}

export interface User {
  userId?: number;
  name?: string;
  email: string;
  password: string;
  role: string;
  comicList?: Comic[];
}

export interface AuthLogin {
  name?: string;
}

export interface Genre {
  genreId?: number;
  genre?: string;
}

// export interface ComicTest {
//   comicId?: number;
//   nameComic: string;
//   author?: string;
//   image_src?: string;
//   state: string;
//   liked?: number;
//   followed?: number;
//   views?: bigint;
//   createDate?: Date;
//   lastModifiedDate?: Date;
//   genreList?: { genreId?: number; genre?: string; }[];
//   chapterList?: { chapterId?: number; chapterNumber: string; createDate?: Date; lastModifiedDate?: Date }[]
// }

export interface Chapter {
  chapterId?: number;
  chapterNumber?: string;
  createDate?: Date; 
  lastModifiedDate?: Date
};