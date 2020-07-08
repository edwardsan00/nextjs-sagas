import React, { Fragment } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ConnectedRouter } from 'connected-next-router'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'utils/theme';
import CssGlobal from 'utils/cssglobal'

import { wrapper } from 'store/configStore.dev'

class MyApp extends App { 
  componentDidMount(){
    const jssStyles: HTMLElement | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }

  render(){
    const {  Component, pageProps } = this.props
    return (
      <Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
          <ThemeProvider theme={theme}>
            <CssGlobal />
            <CssBaseline />
            <ConnectedRouter>
              <Component {...pageProps} />
            </ConnectedRouter>
          </ThemeProvider>
      </Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp)