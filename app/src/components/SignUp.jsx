import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthWrapper } from "./styled-components";

function SignUpForm(props) {
  console.log(props);

  return (
    <AuthWrapper>
      <div className="login-form">
        <Form>
          <label>
            <ErrorMessage
              name="username"
              render={msg => <div className="error">{msg}</div>}
            />
            Username
            <Field type="text" name="username" placeholder="Username" />
          </label>
          <label>
            <ErrorMessage
              name="password"
              render={msg => <div className="error">{msg}</div>}
            />
            Password
            <Field type="password" name="password" placeholder="Password" />
          </label>
          <label>
            <ErrorMessage
              name="confirm_password"
              render={msg => <div className="error">{msg}</div>}
            />
            Confirm your Password
            <Field
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
          </label>

          <input type="submit" />
        </Form>
      </div>
    </AuthWrapper>
  );
}

const SignUpFormWithFormik = withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: "",
      confirm_password: ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your Username"),
    password: Yup.string()
      .required("Please enter your Password")
      .test(
        "Length",
        "Length of your password should be between 12 and 30 characters",
        val =>
          val.toString().length >= 12 && val.toString().length <= 30
            ? true
            : false
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Password confirm is required")
  })
})(SignUpForm);

export default SignUpFormWithFormik;
