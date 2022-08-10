interface ReducerAction {
  type: string;
  payload?: any;
}

interface InitialState {
  data: {
    firstName: string;
    lastName: string;
    country: string;
    avatarUrl: string;
  };
  visibility: boolean;
  loading: boolean;
  error: Error | null;
}

export enum ActionTypes {
  SET_DATA = "SET_DATA",
  CLEAR_DATA = "CLEAR_DATA",
  SET_VISIBILITY = "SET_VISIBILITY",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export const initialState: InitialState = {
  data: {
    firstName: "",
    lastName: "",
    country: "",
    avatarUrl: "",
  },
  visibility: false,
  loading: false,
  error: null,
};

export const reducer = (state: InitialState = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: { ...action.payload } };
    case ActionTypes.CLEAR_DATA:
      return { ...state, data: {...initialState.data} };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_VISIBILITY:
      return { ...state, visibility: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
