import { useState, ChangeEventHandler, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
// import get from "lodash/get";
import flatMap from "lodash/flatMap";
// import clsx from "clsx";
import useDebounce from "hooks/useDebounce";

import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { Typography } from "@material-ui/core";
// import { Button } from "@material-ui/core";

import { Layout } from "@components/Layout";
import { ProductsCollection } from "@components/ProductsCollection";

import {
  ResultsInterface,
  SearchResultInterface,
} from "@api/searchResultInterface";
import { searchProducts } from "@api/index";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
});

export default function Search() {
  const { t } = useTranslation(["page-search"]);
  const [term, setTerm] = useState("shirt");
  const [data, setData] = useState<SearchResultInterface>();
  const searchTerm = useDebounce(term, 500);

  useEffect(() => {
    searchProducts({
      search_term: searchTerm,
      merchant_id: "wrt",
      clear_cache: false,
    }).then((res) => setData(res));
  }, [searchTerm]);

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTerm(event.currentTarget.value);

  const emptyResults = !data?.results?.length;

  let results: ResultsInterface[] = [];
  if (data?.results != null) {
    results = flatMap(data.results);
  }

  return (
    <Layout>
      <main className="pt-16 text-center">
        <div className="max-w-5xl mx-auto mb-6">
          <FormControl fullWidth className="" variant="outlined">
            <InputLabel htmlFor="search-term-field">{t("term")}</InputLabel>
            <OutlinedInput
              id="search-term-field"
              value={term}
              onChange={updateTerm}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
        </div>
        <div>
          {emptyResults ? (
            <Typography variant="body1">{t("notFound", { term })}</Typography>
          ) : null}
        </div>
        <div>
          {!emptyResults ? <ProductsCollection products={results} /> : null}
        </div>
      </main>
      {/* {!hasNextPage ? null : (
        <div className="text-center p4">
          <Button
            variant="outlined"
            // disabled={isFetchingNextPage}
            // className={clsx({ "animate-pulse": isFetchingNextPage })}
            // onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </Button>
        </div>
      )} */}
    </Layout>
  );
}
