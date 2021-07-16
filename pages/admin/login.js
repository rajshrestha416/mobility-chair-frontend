import React from "react";
import Particles from "react-particles-js";
import logo from "../../assets/img/brand/logo.png";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import Link from "next/link";
import Image from 'next/image'

function Login() {
  // const btnClicked = () => {
  //   alert("clicked Login!");
  // };
  return (
    <>
      <div>
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="backgroundAnimation">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 160,
                    density: {
                      enable: false,
                    },
                  },
                  size: {
                    value: 10,
                    random: true,
                  },
                  move: {
                    direction: "bottom",
                    out_mode: "out",
                  },
                  line_linked: { 
                    enable: false,
                  },
                },
                interactivity: {
                  events: {
                    onclick: {
                      enable: true,
                      mode: "remove",
                    },
                  },
                  modes: {
                    remove: {
                      particles_nb: 10,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="login-wrapper">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="fadeIn first">
                  <Image
                    src={logo}
                    id="icon"
                    alt="User Icon"
                    style={{ margin: "25px" }}
                  />
                </div>

                <form className="loginInputType">
                  <input
                    type="text"
                    id="email"
                    className="fadeIn second"
                    name="email"
                    placeholder="email@gmail.com"
                  />
                  <input
                    type="text"
                    id="password"
                    className="fadeIn third"
                    name="password"
                    placeholder="password"
                  />

                  <Link href="/admin/dashboard" passHref>
                    <input
                      type="submit"
                      className="fadeIn fourth"
                      style={{ marginTop: "20px" }}
                      // onClick={btnClicked}
                    />
                  </Link>
                </form>

                <div id="formFooter">
                  <a className="underlineHover " href="#">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
