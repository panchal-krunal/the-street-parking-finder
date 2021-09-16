import {SAVE_CAR_LIST, SAVE_COUNTRY_LIST, SAVE_USER_STEP} from '../types';

let initialState = {
  carList: null,
  countryList: null,
  flowData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_COUNTRY_LIST: {
      return {
        ...state,
        countryList: action.payload.countryList,
      };
    }
    case SAVE_CAR_LIST: {
      return {
        ...state,
        carList: action.payload.carList,
      };
    }
    case SAVE_USER_STEP: {
      return {
        ...state.flowData,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
