import '../styles/globals.css'
import App from "next/app";
import Head from "next/head";
import "../assets/css/custom.css";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/nextjs-argon-dashboard.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
