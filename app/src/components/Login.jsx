import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { AuthWrapper } from "./styled-components";
import actions from "../actions";

function LoginForm(props) {
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

          <input type="submit" />
        </Form>
      </div>
    </AuthWrapper>
  );
}

const LoginFormWithFormik = withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
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
          val && val.toString().length >= 12 && val.toString().length <= 30
            ? true
            : false
      )
  }),

  handleSubmit(values, tools) {
    // values: the values we get back from the form
    // tools: some helpful methods we can use to interact with the form
    tools.props.dispatch(
      actions.login({ username: values.username, password: values.password })
    );
  }
})(LoginForm);

const ConnectForm = connect()(LoginFormWithFormik);

export default ConnectForm;
