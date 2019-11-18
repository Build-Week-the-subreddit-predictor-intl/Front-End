import React from 'react';
import { withFormik, Form, Field,  ErrorMessage } from 'formik';
import {DashboardWrapper} from './styled-components';
import * as Yup from 'yup';
import axios from 'axios';


function Dashboard(props){
    return(
        <DashboardWrapper>
            <div className = "dashboard-form">
                <Form>
                    <label>
                        <ErrorMessage
                            name = "Title"
                            render = {msg=> <div className = "error">{msg}</div>}
                            />
                        Title
                        <Field
                            type = "text"
                            name = "title"
                            placeholder = "Post Title"
                            />
                    </label>
                    <label>
                        <ErrorMessage
                            name = "text"
                            render = {msg=> <div className = "error">{msg}</div>}
                            />
                        Text
                        <Field
                            type = "textarea"
                            name = "text"
                            placeholder = "Text (required)"
                            />
                    </label>

                    <input type="submit"/>
                </Form>
            </div>
        </DashboardWrapper>
    );
}

const DashboardWithFormik = withFormik({
    mapPropsToValues(){
        return  {
            title: "",
            text: ""
        };
    },

    validationSchema: Yup.object().shape({
        title: Yup.string()
            .required("Your post needs to have a title"),
        text: Yup.string()
            .required("Your past needs to contain some text"),
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
})(Dashboard);

export default DashboardWithFormik;