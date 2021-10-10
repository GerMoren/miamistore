import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useServerStyles } from '@styles/ssr'
import { UIProvider } from '@styles/Provider'
import { SessionProvider } from '@auth/client'

import '../styles/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <SessionProvider session={pageProps.session}>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(NextApp)
