// import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_LEVEL = 'UPDATE_LEVEL'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'

/**
 * INITIAL STATE
 */
const defaultLevel = {
  level: 1,
  progress: 0
}

/**
 * ACTION CREATORS
 */
const setLevel = level => ({type: UPDATE_LEVEL, level})
const setProgress = progress => ({type: UPDATE_PROGRESS, progress})

/**
 * REDUCER
 */
export default function (state = defaultLevel, action) {
  switch (action.type) {
    case UPDATE_LEVEL:
      return {level: ++state.level, progress: 0}
    case UPDATE_PROGRESS:
      return {...state, progress: ++state.progress}
    default:
      return state
  }
}
