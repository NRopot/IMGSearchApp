import { Photo } from '../photos';

export interface ICollection {
  name: string;
  description: string;
  count: number;
  photos: Photo[];
}
