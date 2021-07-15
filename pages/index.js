import React, { Component } from "react";
import Router from "next/router";

export default function Home() {
  // return (
    React.useEffect(() => {
      Router.push("/admin/login");
    });

  return <div />;
  // )
}
