import {createStore} from "redux"
import {createWrapper} from "next-redux-wrapper"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"

import reducer from "./reducers/reducer"

const makeStore = () => createStore(reducer, composeWithDevTools())

export const wrapper = createWrapper(makeStore, {debug: process.env.DEV === 'true'})