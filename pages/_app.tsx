import '../styles/globals.css'
import Layout from '../Components/Layout'
import type { AppProps } from 'next/app'
import { store, persistor } from '../store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react';



export default function App({ Component, pageProps }: AppProps) {
  // const store = getStore(pageProps.initialState);
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
