export interface IAlbumData {
  id: string;
  thumbnailUrl: string;
  title: string;
  author: IAlbumAuthor;
  introduction: string;
  list: IAlbumItem[];
  summary: string;
}

export interface IAlbumAuthor {
  id: string;
  name: string;
  attention: string;
  avatar: string;
}

export interface IAlbumItem {
  id: number;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
  serial: number;
}
