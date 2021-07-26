import React from 'react';
import App from "next/app";
import Head from "next/head";
// import Script from 'next/script';
import "../assets/scss/nextjs-argon-dashboard.scss";
import "../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/custom.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="shortcut icon"
            href="/favicon.ico"
          />
          <title>Mobility Wheelchair</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
          />
          <link
            href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"
            rel="stylesheet"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  // return <Component {...pageProps} />
}

export default MyApp
