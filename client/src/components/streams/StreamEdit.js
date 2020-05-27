import React from "react";
import { connect } from "react-redux";
import _ from "lodash"; //use lodash to pick out values we care about to pass down to StreamForm _.pick

// const StreamEdit = (props) => {
//   console.log("from StreamEdit", props);
//   return <div>StreamEdit</div>;
// };
//refactor as class component so we can use componentDidMount to trigger fetchStream(id) action creator so this component gets its own data without relying on the prior page.
// import { fetchStream } from "../../actions"; //add editStream
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  //add for StreamForm
  onSubmit = (formValues) => {
    //just console log for now
    // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // console.log("from StreamEdit", this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // return <div>{this.props.stream.title}</div>;
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* <StreamForm onSubmit={this.onSubmit} initialValues={{title: "initial title",description: "initial desc",}}/> */}
        {/* <StreamForm
          onSubmit={this.onSubmit}
          initialValues={this.props.stream}
        /> This passes extraneous info; use lodash to _.pick only the properties we want*/}
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }
}

//ownProps is the props object that shows up inside this component
const mapStateToProps = (state, ownProps) => {
  // console.log("ownProps inside of mapStateToProps fx: ", ownProps);
  // return { stream: null };
  return { stream: state.streams[ownProps.match.params.id] }; //passing this to connect function from mapStateToProps will give access to the stream we're trying to edit off the ownProps object with all the stream to sue in this StreamEdit component..
};

// export default connect(mapStateToProps, { fetchStream })(StreamEdit); //add editStream action creator to actually make the api request to update our list.
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
