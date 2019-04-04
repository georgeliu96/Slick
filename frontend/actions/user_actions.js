export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

import * as UserUtil from '../util/users_api_util';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const fetchUsers = () => dispatch => (
    UserUtil.fetchUsers().then(users => (
        dispatch(receiveUsers(users))
    ))
);

export const fetchUser = id => dispatch => (
    UserUtil.fetchUser(id).then(user => (
        dispatch(receiveUser(user))
    ))
)