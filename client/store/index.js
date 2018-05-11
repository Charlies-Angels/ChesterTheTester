import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import level from './level'
import sandbox from './sandbox'
import levels from './levels'
import generator from './generator'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({user, level, sandbox, levels, generator})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, middleware)
let persistor = persistStore(store)

export default () => {
	return {store, persistor}
}

export * from './user'
export * from './level'
export * from './sandbox'
export * from './levels'
export * from './generator'
