import { Typography, TypographyProps } from "@material-ui/core";

type ExcerptProps = {
  richText: string;
  limit?: number;
} & Pick<TypographyProps, "color" | "className">;

const LIMIT = 70;

export const Excerpt = ({
  richText,
  limit = LIMIT,
  ...typographyProps
}: ExcerptProps) => {
  const excerpt = richText?.slice(0, limit).split(" ").slice(0, -1).join(" ");

  return (
    <Typography variant="inherit" {...typographyProps}>
      {excerpt}
      <span> ...</span>
    </Typography>
  );
};
