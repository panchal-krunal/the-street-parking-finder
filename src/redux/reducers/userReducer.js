import {VERIFY_OTP} from '../types';

let initialState = {
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP: {
      return {
        ...state,
        userData: null,
      };
    }
    default:
      return state;
  }
};
