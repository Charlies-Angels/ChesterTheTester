import axios from 'axios'

const GET_LEVELS = 'GET_LEVELS';

//action creators
const getLevels = levels => ({type: GET_LEVELS, levels});

//thunks
export const getLevelsThunk = () =>
  dispatch =>
    axios.get('/api/level')
      .then(res =>
        dispatch(getLevels(res.data)))
      .catch(err => console.log(err))

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_LEVELS:
      return action.levels
    default:
      return state
  }
}
