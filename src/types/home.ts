export interface CarouselItem {
  id: string;
  image: string;
  colors: [string, string];
}
export interface GuessItem {
  id: string;
  image: string;
  title: string;
}

export interface ChannelObject {
  results: ChannelItem[];
  info: ChannelInfo;
  pagination: ChannelPagination;
}

export interface ChannelInfo {
  page: number;
  results: number;
  total: number;
}

export interface ChannelPagination {
  current: number;
  total: number;
  pageSize: number;
}

export interface ChannelItem {
  id: string;
  image: string;
  title: string;
  played: number;
  playing: number;
  remark: string;
}
