import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER: 
            return merge({}, state, { [action.user.id]: action.user });
        //TODO: Add action in users_actions to get all the users from DB
        // case RECEIVE_USERS: 
        //     return merge({}, state, action.users);
        default: 
            return state; 
    }
};