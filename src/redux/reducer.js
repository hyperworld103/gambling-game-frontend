import { combineReducers } from 'redux'

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    planwithwhat: 0,
    refererAddress:''
};
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PICK_REFERER':
        return {
          ...state,
          refererAddress: action.payload,
          loading: true
        };
      case 'SET_PLAN_WITH_CARD':
        return {
          ...state,
          planwithwhat: action.payload
        };
      case 'USER_LOADING':
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  
// const postsReducer = (state = [], action) => {
//     switch (action.type) {
//         case "ADD_POST":
//             return [...state, { 
//                 type:action.payload.type,
//                 walletKey:action.payload.walletKey,
//                 totalRedAmount:action.payload.totalRedAmount,
//                 totalGreenAmount:action.payload.totalGreenAmount,
//                 red_history:action.payload.red_history,
//                 green_history:action.payload.green_history    
//             }]
//         case "PICK_REFERER":
//             return { ...state, refererAddress: action.payload.refererAddress };            
//         default: return state
//     }
// }

const rootReducer = combineReducers({
    posts: postsReducer
});

export default rootReducer;