export interface ICarouselItem {
  id: string;
  image: string;
  colors: [string, string];
}
export interface IGuessItem {
  id: string;
  image: string;
  title: string;
}

export interface IChannelObject {
  results: IChannelItem[];
  info: IChannelInfo;
  pagination: IChannelPagination;
}

export interface IChannelInfo {
  page: number;
  results: number;
  total: number;
}

export interface IChannelPagination {
  current: number;
  total: number;
  pageSize: number;
}

export interface IChannelItem {
  id: string;
  image: string;
  title: string;
  played: number;
  playing: number;
  remark: string;
}
