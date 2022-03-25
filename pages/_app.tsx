import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '../app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';
import { isDefined } from '@rnw-community/shared';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
