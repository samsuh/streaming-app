import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    //any time we get an action with type FETCH_STREAM, we take the state and put it in a new state object, and add a new "key:value" pair of the "stream's_id: stream_itself"
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    //_.omit won't change the original state object; it creates a new object less the action.payload (the id we want to delete)
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    //use lodash's mapKeys to take in an array and return an object pass in (listOfStreamsFromAPI, string 'id' that we want to become the key)
    //take this newly mapKey'ed object and pass it into state.
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    default:
      return state;
  }
};
