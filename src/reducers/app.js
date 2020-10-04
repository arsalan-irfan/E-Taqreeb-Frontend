import {
  TOGGLE_NAVBAR,
  IS_OFFLINE
} from "../actions/types";

const initialState = {
  navbarOpen: false,
  offline:false
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navbarOpen: !state.navbarOpen,
      };
    case IS_OFFLINE:
      return {
        ...state,
        offline: true,
      };

    default:
      return state;
  }
}
