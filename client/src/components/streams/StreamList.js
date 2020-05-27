import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* <button className="ui button primary">EDIT</button> */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            EDIT
          </Link>
          {/* <button className="ui button negative">DELETE</button> replace with Link element to go to corresponding DELETE page*/}
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            DELETE
          </Link>
        </div>
      );
    }
  }

  renderList() {
    //compare userId of this stream with this.props.userId (the userId that created the stream originally) -- renderAdmin()
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    //only show if user is signed in. clicking it will send to StreamCreate page. use isSignedIn or check for the userId.
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    // console.log(this.props.streams);
    // return <div>StreamList</div>;
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

//usually we leave it in object form, but put it into an array to map over.
// Object.values turns values in the object into an array.
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
