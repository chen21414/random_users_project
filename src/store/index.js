import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import users from "./users";
import userIndex from "./userIndex";

const appReducer = combineReducers({
  users,
  userIndex,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
