import axiosIns from '~/config/http';
import { CarouselItem, GuessItem } from '~/types/home';
import { IRes } from '~/types/http';

export function getCarousel(): Promise<IRes<CarouselItem[]>> {
  return axiosIns.get(`/carousel`);
}
export function getGuess(): Promise<IRes<GuessItem[]>> {
  return axiosIns.get(`/guess`);
}
