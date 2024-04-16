import { Address } from './address-type';

export type ApiResponse = {
  address: Address;
  company: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string | null;
  website: string;
};
