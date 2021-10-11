import fs from "fs";
import path from "path";
import flatMap from "lodash/flatMap";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import Link from 'next/link'

import { getProduct
    // , searchProducts 
} from "@api/index";

import { Layout } from "@components/Layout";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";

// import { RichText } from '@components/RichText'
// import { AuthorCard } from '@components/AuthorCard'
// import { ProductEntryInline } from '@components/ProductsCollection'

import { Image } from "@components/Image";
import { ProductResultInterface } from "@api/productResultInterface";

type ProductEntryPageProps = {
  product: ProductResultInterface;
};

export const getStaticProps: GetStaticProps<ProductEntryPageProps> = async ({
  params,
  locale,
}) => {
  const sku = params?.sku;

  if (typeof sku !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const product = await getProduct({
      sku,
      merchant_id: "wrt",
      clear_cache: false,
    });
    const i18nConf = await serverSideTranslations(locale!);

    return {
      props: {
        product,
        ...i18nConf,
      },
      revalidate: 5 * 60, // once every five minutes
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

type PathType = {
  params: {
    sku: string;
  };
  locale: string;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (locales == undefined) {
    throw new Error(
      "Uh, did you forget to configure locales in your Next.js config?"
    );
  }

  // Match home query.
  // @TODO how do we generate all of our pages if we don't know the number? 🤔
  //   const plantEntriesToGenerate = await searchProducts({
  //     search_term: 'canicas',
  //     merchant_id: "wrt",
  //     clear_cache: true,
  //    })

  // Generate SSR with SKUS in Skus.txt
  const productEntriesFromFS = fs
    .readFileSync(path.join(process.cwd(), "skus.txt"), "utf-8")
    .toString();
  const productsEntriesToGenerate = productEntriesFromFS
    .split("\n")
    .filter(Boolean);

  const paths: PathType[] = flatMap(
    productsEntriesToGenerate.map((sku) => ({
      params: {
        sku: String(sku) || "",
      },
    })),
    (path) => locales.map((loc) => ({ locale: loc, ...path }))
  );

  return {
    paths,
    // Block until the server gets its data. Like in Server side rendering
    fallback: "blocking",
  };
};

export default function ProductPage({
  product: data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["page-product-entry"]);
  const { product } = data;
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <Image
              width={952}
              aspectRatio="4:3"
              layout="intrinsic"
              src={product.images[0].src}
              alt={product.images[0].alt}
            />
          </figure>
          <div className="p-10">{product.large_description}</div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <div className="px-2">
            <Typography variant="h6">{product.name}</Typography>
          </div>
          <section className="px-2 pt-4">
            <Typography variant="h4" component="h3" className="mb-6">
              {t('prices')}{' = U$S '}{product.prices.price}
            </Typography>
            <Typography variant="h4" component="h3" className="mb-6">
              {t('discount')}{' = '}{product.prices.percentage}{'%'}
            </Typography>
          </section>
          {/* <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              {t('categories')}
            </Typography>
            <ul className="list">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link passHref href={`/category/${category.slug}`}>
                    <Typography component="a" variant="h6">
                      {category.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section> */}
        </Grid>
      </Grid>
      {/* <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...data.author} />
      </section> */}
    </Layout>
  );
}
