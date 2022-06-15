import { sortIdx } from "./utils/reducerFunction";

// ACTIONS

const GET_USERIDX = "GET_USERIDX";

// ACTION CREATORS

export const gotIdx = (idx) => {
  return {
    type: GET_USERIDX,
    idx,
  };
};

// REDUCER

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("idx");
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
    case GET_USERIDX:
      return sortIdx(state, action.idx);
    default:
      return state;
  }
};

export default reducer;
