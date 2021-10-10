import { EXPRESS_BASE_URL } from "./constants";
import { SearchResultInterface } from "./searchResultInterface";

export type IArguments = {
  search_term: string;
  merchant_id: string;
  clear_cache: boolean;
  authorization?: string;
};

export async function searchProducts(
  args?: IArguments
): Promise<SearchResultInterface> {
  const response = await fetch(EXPRESS_BASE_URL + "search", {
    method: "POST",
    body: JSON.stringify(args),
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: args?.authorization || "",
    },
    redirect: "follow",
    referrer: "no-referrer",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}