const initialState = {
  loader: false,
  lists: [],
};

function todoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case "SET_TODO_LOADER":
      return { ...state, loader: action.loader };
    case "RETRIEVE_TODO":
      return { ...state, lists: payload };
    default:
      return state;
  }
}
export default todoReducer;
