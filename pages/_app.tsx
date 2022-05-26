import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import { RegislationContextProvider } from '../components/provider/regislation-context'
import { SessionProvider } from "next-auth/react";
import type { NextComponentType } from "next"
import NotificationContext, { NotificationContextProvider } from '../components/provider/notification-context'
import { CartContextProvider } from '../components/provider/cart-context'
import { AdminContextProvider } from '../components/provider/admin-context'

type CustomeAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean}
}

function MyApp({ Component, pageProps:{ session, ...pageProps } }: CustomeAppProps) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <RegislationContextProvider>
          <AdminContextProvider>
            <CartContextProvider>
              <Layout>
                <Head>
                  <meta
                    charSet='utf-8'
                    httpEquiv='X-UA-Compatible'
                    name='viewport' content='IE=edge, width=device-width initial-scale=1.0'
                  />
                  <title>The Mobile Hour</title>

                </Head>
                  <Component {...pageProps} />
              </Layout>
            </CartContextProvider>
          </AdminContextProvider>
        </RegislationContextProvider>
      </NotificationContextProvider>
    </SessionProvider>
  )
}

export default MyApp
