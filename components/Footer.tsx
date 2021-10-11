import Link from 'next/link'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'

import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'

export const Footer = ({ className }: { className?: string }) => {
  const { t } = useTranslation(['common'])

  return (
    <footer
      className={clsx(
        'pt-8 pb-10 bg-black text-gray-300 overflow-hidden',
        className
      )}
    >
      <div className="max-w-screen-xl mx-auto w-95">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={5}
            className="text-center sm:text-left relative"
          >
            <Typography variant="h5" component="a" href="/" title="Go home">
              Miami&apos;Store
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h5" className="mb-4">
              {t('pages')}
            </Typography>
            <ul className="p0">
              <li className="pb-1">
                <Link href="/docs">
                  <a>{t('gettingStarted')}</a>
                </Link>
              </li>
              <li className="pb-1">
                <Link href="/search">
                  <a>{t('search')}</a>
                </Link>
              </li>
              <li className="pb-1">
                <Link href="/top-stories">
                  <a>{t('topStories')}</a>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" className="mb-4">
              {t('about')}
            </Typography>
            <div className="mt-3">
              <a
                href="https://github.com/GerMoren/miamistore"
                title="Open this project on GitHub"
              >
                Ir al proyecto en GH
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  )
}
