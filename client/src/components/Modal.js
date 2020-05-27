import React from "react";
import ReactDOM from "react-dom";
// import history from "../history"; //no longer needed here because we are passing it in as props from onDimiss

const Modal = (props) => {
  //createPortal takes two arguments: the JSX, and the reference to the element to render the Portal into (some div with #some_id).
  //we will create a sibling to #root called #modal
  return ReactDOM.createPortal(
    <div
      className="ui dimmer modals visible active"
      //   onClick={() => history.push("/")}
      onClick={props.onDismiss}
    >
      <div
        className="ui standard modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
