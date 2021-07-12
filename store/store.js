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

export default function initializeStore(state) {
  const store = createStore(
    reducer,
    Object.assign({}, initialState, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  return store;
}
