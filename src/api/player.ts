import axiosIns from '~/config/http';
import { IRes } from '~/types/http';
import { IPlayerItem } from '~/types/player';

export function getShow(): Promise<IRes<IPlayerItem>> {
  return axiosIns.get(`/show`);
}
