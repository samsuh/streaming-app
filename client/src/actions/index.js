import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import streams from "../apis/streams";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//use redux thunk to make async action creator. pass it dispatch, mark is as async.
//streams.post(the streams endpoint at 3001, and pass it all the values). next hook up action creator to StreamCreate.js, and call it.
export const createStream = (formValues) => {
  return async (dispatch) => {
    const response = await streams.post("/streams", formValues);

    // later, add code to dispatch action (with the new stream as payload) then eventually pass off to a reducer. for now just creating new stream on api.
    //payload is response.data because axios sends a lot back, and all we care about is the info on the response back. we can then create a reducer that receives this new info, and saves the stream.
    dispatch({ type: CREATE_STREAM, payload: response.data });
  };
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

//for fetchStream singular, we need to pass the id of the individual stream you want to fetch
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//for editStream, we need both the id of the stream, as well as the edits we want to make to it on formValues.
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
