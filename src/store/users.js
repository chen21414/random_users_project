import { sortUsers } from "./utils/reducerFunction";

// ACTIONS

const GET_USERS = "GET_USERS";

// ACTION CREATORS

export const gotUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

// REDUCER

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const initialState = loadFromLocalStorage();

const reducer = (state = initialState || null, action) => {
  switch (action.type) {
    case GET_USERS:
      return sortUsers(state, action.users);
    default:
      return state;
  }
};

export default reducer;
