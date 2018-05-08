import axios from 'axios'
import history from '../history'

//action types
const POST_SANDBOX = 'POST_SANDBOX';

//action creators
const postSandbox = sandbox => ({type: POST_SANDBOX, sandbox});

//thunks
export const postCodeToSandbox = (sandbox) =>
  dispatch =>
    axios.post('/api/sandbox', sandbox)
      .then(res =>
        dispatch(postSandbox(res.data)))
      .catch(err => console.log(err))

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case POST_SANDBOX:
      return action.sandbox
    default:
      return state
  }
}
