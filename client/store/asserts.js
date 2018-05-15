import axios from 'axios'

const GET_ASSERTS = 'GET_ASSERTS';

//action creators
const getAsserts = asserts => ({type: GET_ASSERTS, asserts});

//thunks
export const getAssertsThunk = () =>
  dispatch =>
    axios.get('/api/assert')
      .then(res =>
        dispatch(getAsserts(res.data)))
      .catch(err => console.log(err))

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_ASSERTS:
      return action.asserts
    default:
      return state
  }
}
