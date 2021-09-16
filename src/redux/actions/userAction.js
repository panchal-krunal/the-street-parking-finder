import axios from 'axios';
import {API_SEND_OTP, API_VERIFY_OTP} from '../../helpers/config';

export const sendOTP = data => async dispatch => {
  try {
    let response = await axios.post(API_SEND_OTP, data);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
export const verifyOTP = () => async dispatch => {
  try {
    let response = await axios.post(API_VERIFY_OTP, data);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
