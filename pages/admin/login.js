import {React, useState} from "react";
import Particles from "react-particles-js";
import Link from "next/link";
import Image from 'next/image'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from 'next/router'


function Login() {
  const [state, setState] = useState({ email: '', password: '' });

  const router = useRouter();

  const changeHandler = e => {
    const { email, password } = e.target;
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const loginSuccess = async() => {
    await toast.success("Login Successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const loginFail = async() => {
    await toast.error("Login Failed!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const checkAdmin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/admin/login", state)
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          loginSuccess()
          router.push('/admin/dashboard');
        }
        else {
          loginFail()
        }
        
      })
      .catch(err => {
        alert(err);
      });
  };



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
            <div class="wrapper fadeInDown">
              <div id="formContent">
              <div className="fadeIn first">
                  <Image
                    id = "icon"
                    src="/logo.png"
                    alt="User Icon"
                    width="200px" height="100px"
                  />
                </div>

                <form className="loginInputType">
                  <input
                    type="text"
                    id="email"
                    class="fadeIn second"
                    name="email"
                    value={state.email}
                    onChange={changeHandler}
                    placeholder="email@gmail.com"
                  />
                  <input
                    type="text"
                    id="password"
                    class="fadeIn third"
                    name="password"
                    value={state.password}
                    onChange={changeHandler}
                    placeholder="password"
                  />

                  {/* <Link href="/admin/dashboard"> */}
                  <input
                    type="submit"
                    class="fadeIn fourth"
                    style={{ marginTop: "20px" }}
                    onClick={checkAdmin}
                  />
                  {/* </Link> */}
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
      <ToastContainer />
    </>
  );
}
export default Login;
