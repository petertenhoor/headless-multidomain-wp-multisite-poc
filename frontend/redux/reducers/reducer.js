import {HYDRATE} from 'next-redux-wrapper'

import {SET_SITE_DATA} from "../actions/actions"

const initialState = {
    siteId: 0,
    siteUrl: '',
    siteLanguage: 'en',
}

/**
 * Reducer
 * @param state
 * @param action
 * @returns object
 */
export default (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case SET_SITE_DATA:
            return {...state, ...payload}
    }

    return state
}
