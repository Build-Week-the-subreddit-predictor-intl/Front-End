import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {connect} from 'react-redux';
import { DashboardWrapper } from "./styled-components";
import actions from '../actions';

function Dashboard(props) {
  return (
    <DashboardWrapper>
      <div className="dashboard-form">
        <Form>
          <label>
            <ErrorMessage
              name="title"
              render={msg => <div className="error">{msg}</div>}
            />
            Title
            <Field
              as="textarea"
              type="text"
              name="title"
              placeholder="Post Title"
            />
          </label>
          <label>
            <ErrorMessage
              name="text"
              render={msg => <div className="error">{msg}</div>}
            />
            Text
            <Field
              as="textarea"
              type="textarea"
              name="text"
              placeholder="Text (required)"
            />
          </label>

          <button type="submit">See Suggestions</button>
        </Form>
      </div>

      <div className="subreddits"></div>
    </DashboardWrapper>
  );
}

const DashboardWithFormik = withFormik({
  mapPropsToValues(props) {
    console.log(props);
    return {
      title: props.title,
      text: props.text
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup.string().required("Your post needs to have a title"),
    text: Yup.string().required("Your post needs to contain some text")
  }),

  enableReinitialize: true,

  handleSubmit(values, tools) {
    // values: the values we get back from the form
    // tools: some helpful methods we can use to interact with the form
    if(tools.props.isEditing){
      tools.props.dispatch(
        actions.editPostDraft({
          title: values.title,
          text: values.text,
          id: tools.props.id
        })
      )
    }else{
      tools.props.dispatch(
        actions.getRecommendedSubreddit({
          title: values.title,
          text: values.text,
        })
      )
    }
  }
})(Dashboard);

export default connect()(DashboardWithFormik);
