import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '../config/supabaseClient';
import { Product } from '../types/product';

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error || !data) {
    throw new Error(error?.message || 'Failed to fetch products');
  }
  return data;
};

const fetchProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to fetch product');
  }
  return data;
};

export const useProducts = (options?: UseQueryOptions<Product[], Error>) => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    ...options,
  });
};

export const useProduct = (id: string, options?: UseQueryOptions<Product, Error>) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    ...options,
  });
};
