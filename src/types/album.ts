export interface IAlbumData {
  id: string;
  thumbnailUrl: string;
  title: string;
  author: IAlbumAuthor;
  introduction: string;
  list: IAlbumList[];
  summary: string;
}

export interface IAlbumAuthor {
  id: string;
  name: string;
  attention: string;
  avatar: string;
}

export interface IAlbumList {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
  serial: number;
}
