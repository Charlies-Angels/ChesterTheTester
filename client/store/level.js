// import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_LEVEL = 'SET_LEVEL'
const COMPLETE_LEVEL = 'COMPLETE_LEVEL'

/**
 * INITIAL STATE
 */
const defaultLevel = {
  level: 0,
  completed: false,
}

/**
 * ACTION CREATORS
 */

export const completeLevel = () => ({type: COMPLETE_LEVEL})
export const setLevel = (level) => ({type: SET_LEVEL, level})

/**
 * REDUCER
 */
export default function (state = defaultLevel, action) {
  switch (action.type) {
    case SET_LEVEL:
      return {level: action.level, completed: false}
    case COMPLETE_LEVEL:
      return {...state, completed: true}
    default:
      return state
  }
}
