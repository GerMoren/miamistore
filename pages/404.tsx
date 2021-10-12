import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { Layout } from '@components/Layout'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

export default function NotFoundPage() {
  const { t } = useTranslation(['page-errors'])

  return (
    <Layout title="404">
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          {t('wearesorry')}
        </Typography>
        <Typography variant="body1" className="mb-6">
          {t('notFoundErrorMessage')}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title={t('goHome')}
        >
          {t('goHome')}
        </Button>
      </div>
    </Layout>
  )
}
