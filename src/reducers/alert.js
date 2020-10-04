import { SET_ALERT, REMOVE_ALERT, NEW_NOTIFICATION } from '../actions/types';

const initialState = [];

export default function( state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      console.log(payload);
      return state.filter(alert => alert.id !== payload);
    case NEW_NOTIFICATION:
      const notif = 'new Business request from:'+ payload;
      console.log(notif);
      break;
    default:
      return state;
  }
}
