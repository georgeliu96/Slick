export const signup = user => ({
    method: "POST",
    url: "api/users",
    data: {user}
});

export const login = user => ({
    method: "POST",
    url: "api/session",
    data: {user}
});

export const logout = () => ({
    method: "DELETE",
    url: "api/session"
});