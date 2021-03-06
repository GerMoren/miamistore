import Link from "next/link";
import { memo } from "react";

import { Grid, GridProps } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { Image } from "@components/Image";
import { ResultsInterface } from "@api/searchResultInterface";
import { Excerpt } from "./Excerpt";

type ProductCollectionProps = {
  products: ResultsInterface[];
  className?: string;
};

export function ProductsCollection({
  products,
  className,
}: ProductCollectionProps) {
  return (
    <Grid container component="ul" spacing={4} className={className}>
      {products.map((product) => (
        <MemoizedProductEntry key={product.sku} product={product} />
      ))}
    </Grid>
  );
}

const isEqual = (
  previousProps: ProductEntryType,
  newProps: ProductEntryType
) => {
  // What's the property React has to know the component has to be updated?
  // Even though lodash.isEqual could be used here, it could also lead to perf issues
  // for big & deep nested objects.
  // "Cherry-picking" the important props for the app gives the best result here
  return previousProps.product.name === newProps.product.name;
};
const MemoizedProductEntry = memo(ProductEntry, isEqual);

type ProductEntryType = {
  product: ResultsInterface;
};

export function ProductEntry({ product }: ProductEntryType) {
  let gridItemProps: GridProps = { xs: 8, md: 3 };
  let Component: (props: ResultsInterface) => JSX.Element = ProductEntrySquare;

  return (
    <Grid key={product.sku} role="listitem" item {...gridItemProps}>
      <Component {...product} />
    </Grid>
  );
}

export function ProductEntrySquare({ image, name, sku }: ResultsInterface) {
  if (!image) throw new Error("No hay imagen");
  return (
    <Link href={`/products/${sku}`}>
      <a title={`Go to ${name}`}>
        <div className="opacity-95 hover:opacity-100">
          <Image
            src={image}
            layout="intrinsic"
            width={460}
            aspectRatio="1:1"
            alt={name}
            className="flex-none"
          />
          {/* <div className="p-4">
            <Typography variant="h6" className="break-words">
              {name}
            </Typography>
          </div> */}
          <div className="px-4 pb-4">
            <Excerpt
              richText={name || ""}
              color="textSecondary"
              className="py-12"
            />
          </div>
        </div>
      </a>
    </Link>
  );
}

export function ProductEntryInline({
  image,
  name,
  sku,
  className,
}: ResultsInterface & { className?: string }) {
  if (!image) throw new Error("No hay image");
  return (
    <Link href={`/products/${sku}`}>
      <a title={`Go to ${name}`}>
        <div
          className={`opacity-95 hover:opacity-100 flex items-end ${className}`}
        >
          <Image
            src={image}
            layout="fixed"
            width={84}
            aspectRatio="16:9"
            fit="fill"
            className="flex-none"
            alt={name}
          />
          <div className="pl-2 flex-auto">
            <Typography variant="h6" className="break-words">
              {name}
            </Typography>
          </div>
        </div>
      </a>
    </Link>
  );
}

export function ProductEntryVertical({ image, name, sku }: ResultsInterface) {
  if (!image) throw new Error("No hay image");
  return (
    <div className="opacity-95 hover:opacity-100">
      <Link href={`/products/${sku}`}>
        <a title={`Go to ${name}`}>
          <Image
            src={image}
            width={624}
            layout="responsive"
            aspectRatio="16:9"
            alt={name}
          />
          <Typography variant="h2" className="break-words pt-4 px-4">
            {name}
          </Typography>
        </a>
      </Link>
      <div className="px-4 pb-4">
        {/* <Excerpt
          richText={brand}
          color="textSecondary"
          className="py-6"
        /> */}
        <Link href={`/products/${sku}`} passHref>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  );
}
