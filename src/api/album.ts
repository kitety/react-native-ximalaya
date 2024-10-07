import axiosIns from '~/config/http';
import { IAlbumData } from '~/types/album';
import { IRes } from '~/types/http';

export function getAlbumDetail(id: string): Promise<IRes<IAlbumData>> {
  return axiosIns.get(`/album/list`);
}
