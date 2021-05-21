import { csrfFetch } from './csrf';
//action types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//action creators
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

//thunk action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//add a thunk action that will call the GET /api/session, parse the JSON body of the response,
//and dispatch the action for setting the session user to the user in the response's body.
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//add and export a signup thunk action that will hit the signup backend route with username, email, and password inputs.
//after the response from the AJAX call comes back, parse the JSON body of the response, and dispatch the action for setting the session user to the user in the response's body.
export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
    }),
});
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//add and export a logout thunk action that will hit the logout backend route.
//After the response from the AJAX call comes back, dispatch the action for removing the session user.
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

//define initial state
const initialState = { user: null };
//session reducer
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
