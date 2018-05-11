import axios from 'axios'
import history from '../history'

//action types
const UPDATE_CODE = 'UPDATE_CODE'

//action creators
export const updateCode = code => ({type: UPDATE_CODE, code});


//reducer
export default function (state = '//Type functions here. Make sure to invoke your function! \n', action) {
  switch (action.type) {
    case UPDATE_CODE:
      return action.code
    default:
      return state
  }
}
