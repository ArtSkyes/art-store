export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          image: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          image?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          password: string;
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
        };
      };
    };
  };
}
