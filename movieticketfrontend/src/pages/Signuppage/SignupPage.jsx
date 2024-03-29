import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./Signup.css";

const RegisterPage = () => {
  const [requestedResponse, setRequestedResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    password: "",
  };

  let navigate = useNavigate();

  const onSubmit = (values) => {
    
    let userData = {
      username: values.firstName,
      email: values.email,
      mobile_num: values.mobile,
      password: values.password,
    };
    fetch("http://127.0.0.1:8000/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post request sucessful:", response.data);
          navigate("/login");
        } else {
          console.log(response.data);
          throw new Error(`HTTP error! Status: ${response.status}`);

         

          // setBookingResponse(`total Price is ${seat.length*120} and bookedseats: ${seat.join()} and movie time: ${movie_time}}`);
        }
        // return response.json(); // Parse the response JSON if needed
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making POST request:", error.message);
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    email: Yup.string()
      .required("Email name is required")
      .email("email must be a valid email"),
    mobile: Yup.string().required("Mobile is required"),
    password: Yup.string()
      .required("Password must be valid")
      .min(6, "Password must be at least 6 Characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className=" signupbox">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div class={requestedResponse.alertClass} role="alert">
              {requestedResponse.textMessage}
            </div>
            <center>
              <h2>Welcome To</h2>
              <h2>
                <span className="movietag">Movie Maybe</span>
              </h2>
            </center>

            <hr />
            <form className=""onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label className="username" htmlFor="firstName">User Name :</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <small className="text-danger">
                    {formik.errors.firstName}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <label className="username" htmlFor="email">Email :</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.email && formik.touched.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>
              <div className="form-group">
                <label className="username" htmlFor="mobile">Mobile : </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={
                    formik.touched.mobile && formik.errors.mobile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.mobile && formik.touched.mobile ? (
                  <small className="text-danger">{formik.errors.mobile}</small>
                ) : null}
              </div>
              <div className="form-group">
                <label className="username" htmlFor="password">Password :</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>
              <center>
                <button
                  onClick={() => onSubmit(formik.values)}
                  className=" registerbtn "
                  disabled={!formik.isValid}
                >
                  Signup
                </button>
              </center>
            </form>
            <br />
            <p className="text-center clickhere">
              Already Registered? <a href="/login"> Click Here </a>
            </p>
          </div>
        </div>
        <div className="col-md-3"> </div>
      </div>
    </div>
  );
};

export default RegisterPage;
