import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { withExtraArgument } from 'redux-thunk'

// import loggerMiddleware from './middlewares/loggerMiddleware'
// import todoMiddleware from './middlewares/todoMiddleware'
const API = import.meta.env.VITE_API_URL

import counterReducer from './reducers/counterReducer'
import todosReducer from './reducers/todoReducer'

const persistConfig = {
  key: 'redux-core',
  storage, // storage chính là localStorage của browser
  whiteList: ['counter'],
  blacklist: ['todos']
}

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(withExtraArgument(API))))

export const persistor = persistStore(store)
