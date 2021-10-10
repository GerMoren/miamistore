type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

type User = {
  name: string;
  email: string;
  image: string;
};
