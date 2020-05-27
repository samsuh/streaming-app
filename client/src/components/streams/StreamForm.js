import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  //StreamForm doesnt handle the onSubmit logic; it gets told what to do onSubmit from StreamCreate or StreamEdit on 'props', the components reusing StreamForm.
  //   onSubmit = (formValues) => {
  //     console.log(formValues);
  //     this.props.createStream(formValues);
  //   };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "you must enter a title";
  }
  if (!formValues.description) {
    errors.description = "you must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);
//note that we're passing props into reduxForm, which passes it to StreamForm, so we can use special props called "initialValues" to prepopulate fields for StreamEdit.

// export default connect(null, { createStream })(formWrapped);
// StreamForm is a parent component itself; does not need to call an action creator.
