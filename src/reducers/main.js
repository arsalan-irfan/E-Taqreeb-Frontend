import {
  FETCH_ALL_LAWN_SUCCESS,
  FETCH_ALL_LAWN_FAIL,
  SELECTED_LAWN_SUCCESS,
  SELECTED_LAWN_FAIL,
  FETCH_ALL_PHOTOGRAPHER_SUCCESS,
  FETCH_ALL_PHOTOGRAPHER_FAIL,
  PUSH_NEW_LAWN,
  POP_NEW_LAWN,
  PUSH_NEW_PHOTOGRAPHER,
  POP_NEW_PHOTOGRAPHER
} from "../actions/types";

const initialState = {
  lawns: [],
  selectedLawn: {},
  photographers: [],
  caterers: [],
  selectedLawn: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_LAWN_FAIL:
    case FETCH_ALL_LAWN_FAIL:
      return state;

    case FETCH_ALL_LAWN_SUCCESS:
      return {
        ...state,
        lawns: payload.lawns,
      };
    case SELECTED_LAWN_SUCCESS:
      return {
        ...state,
        selectedLawn: payload,
      };
    case FETCH_ALL_PHOTOGRAPHER_SUCCESS:
        return {
          ...state,
          photographers: payload.photographers,
        };
    case FETCH_ALL_PHOTOGRAPHER_FAIL:
      return state

    case PUSH_NEW_LAWN:
      let temp=state.lawns
      temp.push(payload)
      return{
        ...state,
        lawns:temp
      }
    case POP_NEW_LAWN:
      let temp2=state.lawns.filter(lawn=>lawn._id!==payload._id)
      return{
        ...state,
        lawns:temp2
      }
    case PUSH_NEW_PHOTOGRAPHER:
      let temp3=state.photographers
      temp3.push(payload)
      return{
        ...state,
        lawns:temp3
      }
    case POP_NEW_PHOTOGRAPHER:
      let temp4=state.photographers.filter(lawn=>lawn._id!==payload._id)
      return{
        ...state,
        lawns:temp4
      }      
    default:
      return state;
  }
}
