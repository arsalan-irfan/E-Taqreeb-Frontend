import {
  FETCH_APPROVED_LAWN_FAIL,
  FETCH_APPROVED_LAWN_SUCCESS,
  FETCH_APPROVED_PHOTOGRAPHER_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_SELECTED_LAWN_SUCCESS,

  FETCH_SELECTED_PHOTOGRAPHER_SUCCESS,
  FETCH_SELECTED_LAWN_FAIL,
  USER_COUNT_SUCCESS,
  LAWN_BLOCK_STATUS,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  BUSINESS_FETCH_SUCCESS,
  SELECTED_BUSINESS_FETCH_SUCCESS,
  FETCH_UNAPPROVED_LAWN_SUCCESS,
  FETCH_UNAPPROVED_PHOTOGRAPHER_SUCCESS,
  APPROVE_LAWN_SUCCESS,
  APPROVE_PHOTOGRAPHER_SUCCESS
} from "../actions/types";

const initialState = {
  users: null,
  blockedUsers: null,
  businesses: null,
  lawns: [],
  photographers:[],
  errors: null,
  isLoading: false,
  message: [],
  selectedBusiness: {},
  selectedLawn: null,
  selectedPhotographer:null,
  selectedUser: null,
  userCount: 0,
  lawnCount: 0,
  photographerCount: 0,
  catererCount: 0,
  userCounts: {},
  dialogOpen: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let msg = [];
  switch (type) {
    case FETCH_APPROVED_LAWN_SUCCESS:
      //  msg.push(payload.msg);
      var { lawns } = payload;
      return {
        ...state,
        lawns,
        lawnCount: lawns.length,
      };
      case FETCH_APPROVED_PHOTOGRAPHER_SUCCESS:
        //  msg.push(payload.msg);
        var { photographers } = payload;
        return {
          ...state,
          photographers,
          photographerCount: photographers.length,
        };
    case APPROVE_LAWN_SUCCESS:
      const { id } = payload;
      var a = state.lawns;
      const lawn = a.filter(function (lawn) {
        if (lawn._id != id) {
          return lawn;
        }
      });
      //console.log(lawn);

      return {
        ...state,
        lawns: lawn,
        selectedLawn: null,
      };
    case APPROVE_PHOTOGRAPHER_SUCCESS:
        const  pid  = payload.id;
        var a = state.photographers;
        const photographer = a.filter(function (photographer) {
          if (photographer._id != pid) {
            return photographer;
          }
        });
        //console.log(photographer);
  
        return {
          ...state,
          photographers: photographer,
          selectedPhotographer: null,
        };
    case FETCH_UNAPPROVED_LAWN_SUCCESS:
      msg.push(payload.msg);

      var { lawns } = payload;
      //console.log(lawns);
      var date2 = new Date();
      lawns.filter(function (lawn) {
        // console.log(lawn.createdAt)
        const date1 = new Date(lawn.createdAt);
        //var diff = Math.abs(date2 - date1);

        var hours = Math.floor(((date2 - date1) / (1000 * 60 * 60)).toFixed(1));
        console.log("hours:", hours);
        if (hours == 0) {
          console.log("zero hours!");
          lawn.createdAt = "less than an hour ago";
        }
        if (hours >= 24) {
          lawn.createdAt = "more than one day";
        }
        if (hours < 24 && hours != 0) {
          lawn.createdAt = hours + " hours";
        }
        //console.log(hours)
      });
      return {
        ...state,
        lawns,
        lawnCount: lawns.length,
        message: msg,
      };
      case FETCH_UNAPPROVED_PHOTOGRAPHER_SUCCESS:
        msg.push(payload.msg);
  
        var { photographers } = payload;
        console.log(photographers);
        var date2 = new Date();
        photographers.filter(function (photographer) {
          // console.log(photographer.createdAt)
          const date1 = new Date(photographer.createdAt);
          //var diff = Math.abs(date2 - date1);
  
          var hours = Math.floor(((date2 - date1) / (1000 * 60 * 60)).toFixed(1));
          console.log("hours:", hours);
          if (hours == 0) {
            console.log("zero hours!");
            photographer.createdAt = "less than an hour ago";
          }
          if (hours >= 24) {
            photographer.createdAt = "more than one day";
          }
          if (hours < 24 && hours != 0) {
            photographer.createdAt = hours + " hours";
          }
          //console.log(hours)
        });
        return {
          ...state,
          photographers,
          photographerCount: photographers.length,
          message: msg,
        };
  
    case FETCH_USERS_SUCCESS:
      const { users } = payload;
      console.log("fetched Users:", users);
      const blockedUsers = users.filter((user) => {
        if (user.isBlock == true) {
          console.log("blocked User:", user);
          return user;
        }
      });
      const unblockedUsers = users.filter((user) => {
        if (user.isBlock == false) {
          console.log("unblocked User:", user);
          return user;
        }
      });
      console.log("unblocked Users:", unblockedUsers);
      console.log("blocked users:", blockedUsers);
      return {
        ...state,
        users: unblockedUsers,
        blockedUsers,

        userCount: users.length,
        //  message: msg,
      };
    case BUSINESS_FETCH_SUCCESS:
      const { businesses } = payload;
      return {
        ...state,
        businesses,
      };
    case SELECTED_BUSINESS_FETCH_SUCCESS:
      const { business, user } = payload;
      return {
        ...state,
        selectedBusiness: business,
        selectedUser: user,
      };
    case USER_COUNT_SUCCESS:
     
      return {
        ...state,
        userCounts: payload,
      };
    case FETCH_APPROVED_LAWN_FAIL:
    case FETCH_USERS_FAIL:
    case FETCH_SELECTED_LAWN_FAIL:
      return {
        ...state,
        errors: payload,
      };
    case FETCH_SELECTED_LAWN_SUCCESS:
      console.log("fetch selected lawn dispatched:", payload);
      return {
        ...state,
        selectedLawn: payload.lawn,
        selectedUser: payload.user,
      };
    case FETCH_SELECTED_PHOTOGRAPHER_SUCCESS:
      console.log("fetch selected photographer dispatched:", payload);
      return {
        ...state,
        selectedPhotographer: payload.photographer,
        selectedUser: payload.user,
      };
    case LAWN_BLOCK_STATUS:
      return {
        ...state,
      };
    case OPEN_DIALOG:
      return {
        ...state,
        dialogOpen: true,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialogOpen: false,
      };
    default:
      return {
        ...state,
      };
  }
}
