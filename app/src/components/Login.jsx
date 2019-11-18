import React from 'react';
import { withFormik, Form, Field,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {AuthWrapper} from './styled-components';

function LoginForm(props){
    console.log(props);
    
    return (
        <AuthWrapper>    
            <div className = "login-form">
                <Form>
                    <label>
                        <ErrorMessage
                            name = "username"
                            render = {msg=> <div className = "error">{msg}</div>}
                            />
                        Username
                        <Field
                            type = "text"
                            name = "username"
                            placeholder = "Username"
                            />
                    </label>
                    <label>
                        <ErrorMessage
                            name = "password"
                            render = {msg=> <div className = "error">{msg}</div>}
                            />
                        Password
                        <Field
                            type = "password"
                            name = "password"
                            placeholder = "Password"
                            />
                    </label>

                    <input type="submit"/>
                </Form>
            </div>
        </AuthWrapper>
    );
}

const LoginFormWithFormik = withFormik({
    mapPropsToValues(){
        return  {
            username: "",
            password: ""
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Please enter your Username"),
        password: Yup.string()
            .required("Please enter your Password")
            .test("Length", "Length of your password should be between 12 and 30 characters", (val=> ((val.toString().length >= 12)&&(val.toString().length <= 30)) ? true : false)),
    }),

    handleSubmit(values, tools) {
        // values: the values we get back from the form
        // tools: some helpful methods we can use to interact with the form
        
        axios.post("URL HERE", values)
          .then(res => {
            console.log(res.data);
            tools.resetForm();
          })
          .catch(err => {
            console.log(err);
          });
      }
})(LoginForm);

export default LoginFormWithFormik;