export const RECEIVE_USERS = "RECEIVE_USERS";

import * as UserUtil from '../util/users_api_util';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const fetchUsers = () => dispatch => (
    UserUtil.fetchUsers().then(users => (
        dispatch(receiveUsers(users))
    ))
);