import { searchProducts } from "@api/index";

export function useInfiniteProductSearch(queryKey: string) {
  return async () => {
    await searchProducts({
      search_term: queryKey,
      merchant_id: "wrt",
      clear_cache: true,
    });
  };
}
