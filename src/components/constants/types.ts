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
  chapterList?: { chapterIdConcat?: number; chapterNumberConcat?: string; }[] | string[];
  chapterNumber?: number;
}

export interface ChapterInfo {
  chapterIdConcat?: number;
  chapterNumberConcat?: string;
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

export interface Chapter {
  chapterId?: number;
  chapterNumber?: string;
  createDate?: Date; 
  lastModifiedDate?: Date
};

export interface FileData {
  id?: bigint;
  name?: string;
  type?: string;
  filePath?: string;
}

export interface ComicFull {
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
  chapterList?: { chapterId?: number; chapterNumber: string; createDate?: Date; lastModifiedDate?: Date; fileDataList?: FileData[] }[];
}