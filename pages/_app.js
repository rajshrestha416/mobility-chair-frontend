import React from 'react';
import '../styles/globals.css'
import App from "next/app";
import Head from "next/head";
import "../assets/css/custom.css";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/nextjs-argon-dashboard.scss";

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
          {/* <link
            rel="shortcut icon"
            href={require("assets/img/brand/favicon.ico")}
          /> */}
          <title>Mobility Wheelchair</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  // return <Component {...pageProps} />
}

export default MyApp
