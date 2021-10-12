import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { Layout } from "@components/Layout";

import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
});

export default function NotFoundPage({
  statusCode = 500,
}: {
  statusCode?: number;
}) {
  const { t } = useTranslation(["page-errors"]);

  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          {t("somethingWentWrong")}
        </Typography>
        <Typography variant="body1" className="mb-6">
          {t("errorMessage")}
        </Typography>
        <Typography variant="body1" className="mb-6">
          <span className="bg-gray-300 inline-block">
            ERRORCODE: {statusCode}
          </span>
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title={t("goHome")}
        >
          {t("goHome")}
        </Button>
      </div>
    </Layout>
  );
}
