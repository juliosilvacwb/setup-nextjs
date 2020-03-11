import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { fromJS } from 'immutable';
import { register, unregister } from 'next-offline/runtime';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from '../internalization/i18n';
import { initialStore } from '../state/store';
import loadFonts from '../theme/Fonts';
import theme from '../theme/Theme';

const MyApp = ({ Component, pageProps, store }) => {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
        loadFonts();
        register();
    }, []);

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Head>
                        <title>Setup NextJS</title>
                        <meta
                            name='description'
                            content='Minimum system implemented for a WEB application.
                            The idea of this project is to provide a system template with the minimum necessary to start a reac frontend project.'
                        />
                        <meta
                            name='keywords'
                            content='react, nextjs, next js, material-ui, redux'
                        />
                        <link rel='manifest' href='/static/manifest.json' />
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            </I18nextProvider>
        </Provider>
    );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
};

export default withRedux(initialStore, {
    serializeState: (state) => state.toJS(),
    deserializeState: (state) => fromJS(state),
  })(MyApp);
