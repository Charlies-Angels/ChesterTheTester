// import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const START_GAME = 'START_GAME'
const UPDATE_LEVEL = 'UPDATE_LEVEL'
const COMPLETE_LEVEL = 'COMPLETE_LEVEL'

/**
 * INITIAL STATE
 */
const defaultLevel = {
  level: 1,
  completed: false,
}

/**
 * ACTION CREATORS
 */
export const levelOne = () => ({type: START_GAME, level: 1})
export const completeLevel = () => ({type: COMPLETE_LEVEL})
export const setLevel = level => ({type: UPDATE_LEVEL, level})

/**
 * REDUCER
 */
export default function (state = defaultLevel, action) {
  switch (action.type) {
    case START_GAME:
    return {level: 1, completed: false}
    case UPDATE_LEVEL:
      return {level: ++state.level, completed: false}
    case COMPLETE_LEVEL:
      return {...state, completed: true}
    default:
      return state
  }
}
