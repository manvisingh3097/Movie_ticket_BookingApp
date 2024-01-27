import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
// import Endpoints from "../api/Endpoints";

const LoginPage = () => {
  const navigate = useNavigate();

  const [requestedResponse, setRequestedResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .get(`http://127.0.0.1:8000/api/user?username=${values.username}&password=${values.password}`)
      .then(
        (response) => {
          setRequestedResponse({
            textMessage: "login succesfull , thank you",
            alertClass: "alert alert success",
          });

          localStorage.setItem("token", response.data.jwt);
          setRequestedResponse({
            textMessage: `${response.data.message}`,
            alertClass: "alert alert-danger",
          });
          localStorage.setItem('username', values.username);
          localStorage.setItem('userid', response.data.userid);
          navigate("/home");
        },
        (error) => {
          setRequestedResponse({
            textMessage: `${error.response.data.message}`,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("username is required")
      .min(1,"username must be a valid user"),
    password: Yup.string()
      .required("Password must be valid")
      .min(6, "Password must be at least 6 Characters"),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div class={requestedResponse.alertClass} role="alert">
              {requestedResponse.textMessage}
            </div>
<center>
<h2 className="H2"> Login </h2>
</center>
            
            <hr />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form className="loginform">
                    <div className="form-group">
                      <label className="username">Username</label>
                      <Field
                        type="text"
                        name="username"
                        className={
                          formik.touched.username && formik.errors.username
                            ? "formik-control is-invalid"
                            : "form-control"
                        }
                      />

                      <ErrorMessage name="username">
                        {(errorMessage) => (
                          <small className="text-danger"> {errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-group">
                      <label className="username">Password </label>
                      <Field
                        type="password"
                        name="password"
                        className={
                          formik.touched.password && formik.errors.password
                            ? "formik-control is-invalid"
                            : "form-control"
                        }
                      />

                      <ErrorMessage name="password">
                        {(errorMessage) => (
                          <small className="text-danger"> {errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <center>
                    <input
                      type="submit"
                      value="Login"
                      className="loginbtn"
                      disabled={!formik.isValid}
                    />
                    </center>
                    
                  </Form>
                );
              }}
            </Formik>
            <br />
            <p className="text-center loginall">
              new user? <Link to="/signup"> Click Here </Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"> </div>
      </div>
    </div>
  );
};


export default LoginPage;
