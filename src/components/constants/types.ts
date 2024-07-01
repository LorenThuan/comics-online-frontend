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
  number_chapters?: number;
}

export interface User {
  userId?: number;
  name?: string;
  email: string;
  password: string;
  role: string;
  comicList?: ComicTest[];
}

export interface AuthLogin {
  name?: string;
}

export interface ComicAdd {
  comicId: number;
  nameComic: string;
  author?: string;
  image_src: string;
  state: string;
  liked?: number;
  followed?: number;
  views?: bigint;
  createDate: Date;
  lastModifiedDate?: Date;
  // genreList?: Genre[];
}

export interface ComicTest {
  comicId: number;
  nameComic: string;
  author: string;
  image_src: string;
  state: string;
  liked: number;
  followed: number;
  views: bigint;
  createDate: Date;
  lastModifiedDate: Date;
  genreList: { genreId: number; genre: string }[];
  // chapterList?: { chapterId: number; chapterNumber: string; createDate: Date; lastModifiedDate: Date }[]
}

// export interface Genre {
//   genreId?: number;
//   genre?: string;
// }