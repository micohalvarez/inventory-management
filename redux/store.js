// store.ts

import { createStore, applyMiddleware } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

// create your reducer

// create a makeStore function
const makeStore = (context) => createStore(rootReducer, applyMiddleware(thunk))

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
