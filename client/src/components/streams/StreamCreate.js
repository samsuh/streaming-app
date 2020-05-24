import React from "react";
import { Field, reduxForm } from "redux-form";
//Field is a react component, reduxForm is the same as the connect function from react-redux. it allows us to call action creators and maps it to props.

class StreamCreate extends React.Component {
  // receive redux formProps to pass along to Field component. up to us to hook up onChange and value to the input element.
  // renderInput(formProps) {
  //   return (
  //     <input
  //       onChange={formProps.input.onChange}
  //       value={formProps.input.value}
  //     />
  //   );
  // }
  // spreads all the formProps properties to the input element.
  // renderInput(formProps) {
  //   return <input {...formProps.input} />;
  // }
  //destructure input off formProps to condense code further
  // renderInput({ input }) {
  //   return <input {...input} />;
  // }

  //organize output to display better visually
  // meta.errors contains error message inside renderInput
  // comes from validate function because of the matching 'name' we gave the Field, and errors.name (for example, errors.title for the name="title" Field)
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

  //onSubmit function we made gets passed into the existing handleSubmit fx from redux-form. preventDefault is done by redux-form
  onSubmit(formValues) {
    console.log(formValues);
  }

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
  // if there is a problem, return an object containing key:value, {nameOfField: 'the error message to show'}
  // if errors object is empty, no problems. if something is in it, there was an error.
  const errors = {};

  if (!formValues.title) {
    //only run code if user did not enter title. if this doesnt run, everything was okay.
    errors.title = "you must enter a title";
  }
  if (!formValues.description) {
    //only run code if user did not enter description. if this doesnt run, everything was okay.
    errors.description = "you must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);
