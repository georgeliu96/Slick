import { RECEIVE_ERRORS } from '../actions/session_actions';

const _defaultState = {
    session: []
};

export default sessionErrorsReducer = (state = _defaultState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ERRORS: 
            return merge({}, state, action.errors);
        default: 
            return state;
    }
};