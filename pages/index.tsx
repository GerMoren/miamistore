// import { GetStaticProps, InferGetStaticPropsType } from "next";
// import { Layout } from "@components/Layout";
// // import { getPlantList } from '@api'
// // import { PlantCollection } from '@components/PlantCollection'
// // import { Hero } from '@components/Hero'
// // import { Authors } from '@components/Authors'

// type HomeProps = { plants: string };

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const plants = "Hola";

//   return {
//     props: {
//       plants,
//     },
//   };
// };

// export default function Home({}: // plants,
// InferGetStaticPropsType<typeof getStaticProps>) {
//   return (
//     <div>
//       <Layout>
//         {/* <Hero {...plants[0]} className="mb-20"></Hero> */}
//         {/* <Authors className="mb-10"></Authors> */}
//         {/* <PlantCollection
//         className="mb-24"
//         plants={plants.slice(1, 3)}
//         variant="vertical"
//         />
//         <PlantCollection
//         plants={plants.length > 8 ? plants.slice(3, 9) : plants}
//         variant="square"
//       /> */}
//       </Layout>
//     </div>
//   );
// }

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@components/Layout";
import { ResultsInterface
  // , SearchResultInterface
 } from "@api/searchResultInterface";
// import { searchProducts } from "@api/index";
import { ProductsCollection } from "@components/ProductsCollection";
// import { getPlantList } from '@api'
// import { Hero } from '@components/Hero'
// import { PlantCollection } from '@components/PlantCollection'
// import { Authors } from '@components/Authors'

type HomeProps = {
  products: ResultsInterface[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale}) => {

  const i18nConf = await serverSideTranslations(locale!);
  const plants = {
    "currentPage": 1,
    "filter": [],
    "pageResultTotal": 200000,
    "pagination": [
        {
            "label": "1",
            "value": null,
            "link": null
        },
        {
            "label": "2",
            "value": "page=2",
            "link": "page=2"
        },
        {
            "label": "3",
            "value": "page=3",
            "link": "page=3"
        },
        {
            "label": "4",
            "value": "page=4",
            "link": "page=4"
        },
        {
            "label": "5",
            "value": "page=5",
            "link": "page=5"
        },
        {
            "label": "6",
            "value": "page=6",
            "link": "page=6"
        },
        {
            "label": "7",
            "value": "page=7",
            "link": "page=7"
        },
        {
            "label": "Siguiente",
            "value": "page=2",
            "link": "page=2"
        }
    ],
    "results": [
        {
            brand: "Time and Tru",
            image: "https://i5.walmartimages.com/asr/0ab96744-6f93-41cc-84db-192ae4e5b348.efb5654f324b39fd641b7237c8737c5b.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
            name: "Time and Tru Women's Sublimation Flutter Sleeve Top",
            price: {
                price: 17.97,
                percentage: 0,
                listPrice: 0
            },
            sku: "962792674",
            prime: false,
            bestSeller: false,
            rating: { number: 5, total: 5},
        }
    ],
    "sorter": [
        {
            "title": "Featured Items",
            "value": "sorter=RELEVANCE",
            "selected": true,
        },
    ]
}
  // const plants = await searchProducts({
  //   search_term: "shirt",
  //   merchant_id: "wrt",
  //   clear_cache: true,
  //   authorization: JSON.parse('{"_token":"112969244977345874866","_email":"german.moren@tiendamia.com","_name":"German Moren","_avatar":"https://lh3.googleusercontent.com/a-/AOh14GgJ_yABGcZ_Kd_6gl7GgkW1wxGinL2y67YJnWIR=s96-c","_session":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjgxOWQxZTYxNDI5ZGQzZDNjYWVmMTI5YzBhYzJiYWU4YzZkNDZmYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTc1NzgzNjg2MzgxLTlncDdrcXAxYjUzYmhibmZ0N2o4ZzQ4Y3RscjR1YW5zLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTc1NzgzNjg2MzgxLTlncDdrcXAxYjUzYmhibmZ0N2o4ZzQ4Y3RscjR1YW5zLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyOTY5MjQ0OTc3MzQ1ODc0ODY2IiwiaGQiOiJ0aWVuZGFtaWEuY29tIiwiZW1haWwiOiJnZXJtYW4ubW9yZW5AdGllbmRhbWlhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTTVSZUZqYUU4LWJONkxxd0ptWDZKdyIsIm5hbWUiOiJHZXJtYW4gTW9yZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dKX3lBQkdjWl9LZF82Z2w3R2drVzF3eEdpbkwyeTY3WUpuV0lSPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikdlcm1hbiIsImZhbWlseV9uYW1lIjoiTW9yZW4iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYzMDMzMTQzOSwiZXhwIjoxNjMwMzM1MDM5LCJqdGkiOiI3Zjg2MTYwMjFkY2I2YjVlNzI1NTY2ZDFkYjU5MDY5ODMyOThhODQyIn0.d5ahPNPCthKPe4uaDJhUFLXqKuOt71NRb6AIDkqYyEw_65VSy-cj9V6-0wD5XogOUR42jKqWXh5jJ3HtwdaF50twckSqTM2gROSpARpN6yjgrMgZP5nvqm61-h9mSq8L6khrKbQC7G_GuWuUXrtVN4uwJIOg3TGu8eguUUIU1KrbFcPhOZLBYx_OjGE39rTJhpLqJMfdl7Ti71ZBN16EVspy83WO8NxXrEqqLW2rgf-8fAdQRSuIXyJBC9K78fM9Tj_-r1M8ZnzU6N8xkPDNH7rrhJhulYDE12fheKFPKN6gLDsSAxdsbKJwN_gK_TmvsFyuwFQBmkObcNYu3O87Ww","_role":"/Sistemas/Desarrollo"}')._session,
  // });

  return {
    props: { products: plants?.results, ...i18nConf },
    revalidate: 5 * 60, // once every five minutes
  };
};

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      {/* <Hero {...plants[0]} className="mb-20" /> */}
      {/* <Authors className="mb-10" /> */}
      <ProductsCollection products={products.slice(1, 3)} className="mb-24" />
      <ProductsCollection
        products={products.length > 8 ? products.slice(3, 9) : products}
      />
    </Layout>
  );
}
