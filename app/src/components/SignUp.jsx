import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthWrapper } from "./styled-components";
import { connect } from "react-redux";
import actions from "../actions";

function SignUpForm(props) {
  return (
    <AuthWrapper>
      <div className="login-form">
        <Form>
          <h2>Welcome to PostHere!</h2>
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
            <span>Confirm Password</span>
            <Field
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
          </label>

          <button type="submit">Sign Up</button>
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
    password: Yup.string().required("Please enter your Password")
    .test(
      "Length",
      "Length of your password should be between 4 and 100 characters",
      val =>
        val && val.toString().length >= 4 && val.toString().length <= 100
          ? true
          : false
    ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Password confirm is required")
  }),
  handleSubmit(values, tools) {
    // values: the values we get back from the form
    // tools: some helpful methods we can use to interact with the form
    tools.props
      .dispatch(
        actions.register({
          username: values.username,
          password: values.password
        })
      )
      .then(() => tools.props.history.push("/login"));
  }
})(SignUpForm);

const ConnectForm = connect()(SignUpFormWithFormik);

export default ConnectForm;
