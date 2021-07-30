import Layout from '../components/layout'
import '../styles/index.css'
import React from 'react';
import {Provider} from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <Provider store={store}><Component {...pageProps} /></Provider>
    </Layout>
  )
}

export default MyApp;
