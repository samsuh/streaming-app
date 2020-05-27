import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//refactor Modal to be reusable by passing it Props
//use React.Fragment to be an invisible element instead of a div. Can shorten as <></>. Some linters cant tolerate empty syntax.
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

//refactor functional component to class-based to use componentDidMount to fetchStream to get info about the particular stream at this id.
class StreamDelete extends React.Component {
  componentDidMount() {
    //params has id from the url/:id available on 'this.props.match.params.id'
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return (
      <>
        Are you sure you want to delete stream: "
        <span style={{ fontWeight: "bold" }}>{this.props.stream.title}</span>
        "?
      </>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

//define mapStateToProps, get the stream out of the redux store, into the component, then show info about it on the StreamDelete component
//we use ownProps to get 'match' off of it, to get 'params.id', ultimately giving us access to the stream id.
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
