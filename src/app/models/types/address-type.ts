import { Geo } from './geo-type';

export type Address = {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
};
