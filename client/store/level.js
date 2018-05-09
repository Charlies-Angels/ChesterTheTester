// import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const START_GAME = 'START_GAME'
const UPDATE_LEVEL = 'UPDATE_LEVEL'

/**
 * INITIAL STATE
 */
const defaultLevel = {
  level: 1,
}

/**
 * ACTION CREATORS
 */
export const levelOne = () => ({type: START_GAME, level: 1})
export const setLevel = level => ({type: UPDATE_LEVEL, level})

/**
 * REDUCER
 */
export default function (state = defaultLevel, action) {
  switch (action.type) {
    case START_GAME:
    return action.level
    case UPDATE_LEVEL:
      return {level: ++state.level, progress: 0}
    default:
      return state
  }
}
