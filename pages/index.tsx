import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { searchProducts } from "@api/index";
import { ResultsInterface } from "@api/searchResultInterface";
import { Layout } from "@components/Layout";
import { ProductsCollection } from "@components/ProductsCollection";

type HomeProps = {
  products: ResultsInterface[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const i18nConf = await serverSideTranslations(locale!);
  const data = await searchProducts({
    search_term: "t-shirt",
    merchant_id: "wrt",
    clear_cache: true,
  });

  return {
    props: { products: data.results || [], ...i18nConf },
    revalidate: 5 * 60, // once every five minutes
  };
};

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <ProductsCollection products={products} />
    </Layout>
  );
}
