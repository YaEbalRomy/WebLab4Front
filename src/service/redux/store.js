import {applyMiddleware, createStore} from 'redux';
import rootReducer from "../reducer/reducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composedEnhancer)

export default store;