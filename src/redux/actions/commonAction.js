import axios from 'axios';
import {API_CAR_MODEL, API_COUNTRY_CITY} from '../../helpers/config';
import {SAVE_CAR_LIST, SAVE_COUNTRY_LIST, SAVE_USER_STEP} from '../types';

export const getCountryList = () => async dispatch => {
  try {
    let response = await axios.get(API_COUNTRY_CITY);
    dispatch({
      type: SAVE_COUNTRY_LIST,
      payload: {
        countryList: response.data.data,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const getCarList = () => async dispatch => {
  try {
    let response = await axios.get(API_CAR_MODEL);
    dispatch({
      type: SAVE_CAR_LIST,
      payload: {
        carList: response.data.data,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const saveUserStep = data => async dispatch => {
  dispatch({
    type: SAVE_USER_STEP,
    payload: data,
  });
};
