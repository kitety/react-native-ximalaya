import axiosIns from '~/config/http';
import { ICarouselItem, IChannelObject, IGuessItem } from '~/types/home';
import { IRes } from '~/types/http';

export function getCarousel(): Promise<IRes<ICarouselItem[]>> {
  return axiosIns.get(`/carousel`);
}
export function getGuess(): Promise<IRes<IGuessItem[]>> {
  return axiosIns.get(`/guess`);
}
export function getChannel(page: number = 1): Promise<IRes<IChannelObject>> {
  return axiosIns.get(`/channel?page=${page}`);
}
