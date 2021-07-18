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
            href="../assets/img/brand/favicon.ico"
          />
          <title>Mobility Wheelchair</title>
          {/* <Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE" async="true"></Script> */}
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  // return <Component {...pageProps} />
}

export default MyApp
