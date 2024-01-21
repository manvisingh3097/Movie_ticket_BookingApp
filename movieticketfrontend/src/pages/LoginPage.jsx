import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
// import Endpoints from "../api/Endpoints";

const LoginPage = () => {
  const navigate = useNavigate();

  const [requestedResponse, setRequestedResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post("http://127.0.0.1:8000/api/user/login=", values)
      .then(
        (response) => {
          setRequestedResponse({
            textMessage: "login succesfull , thank you",
            alertClass: "alert alert success",
          });

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("token", JSON.stringify(response.data.user));

          navigate("/");
        },
        (error) => {
          setRequestedResponse({
            textMessage: "error.response.data.message",
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid email"),
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

            <h2> Login </h2>
            <hr />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        type="text"
                        name="email"
                        className={
                          formik.touched.email && formik.errors.email
                            ? "formik-control is-invalid"
                            : "form-control"
                        }
                      />

                      <ErrorMessage name="email">
                        {(errorMessage) => (
                          <small className="text-danger"> {errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="form-group">
                      <label>Password </label>
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
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-primary btn-block"
                      disabled={!formik.isValid}
                    />
                  </Form>
                );
              }}
            </Formik>
            <br />
            <p className="text-center">
              new user? <Link to="/register"> Click Here </Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"> </div>
      </div>
    </div>
  );
};


export default LoginPage;
