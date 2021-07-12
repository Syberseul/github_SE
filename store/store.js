import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  count: 0,
};

const ADD = "add";

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
