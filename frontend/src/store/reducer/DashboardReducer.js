const initialState = {
  loader: false,
  lists: [],
};

function DashboardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case "SET_DASHBOARD_LOADER":
      return { ...state, loader: action.loader };
    case "RETRIEVE_DASHBOARD":
      return { ...state, lists: payload };
    default:
      return state;
  }
}

export default DashboardReducer;
    