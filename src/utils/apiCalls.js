import axios from 'axios';
import apiURL from '../constants/constant';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const authCall = async user => {
  //   setShowAuthLoader(true);
  try {
    const result = await axios.post(
      `${apiURL}/auth/login`,
      {user},
      {withCredentials: true},
    );
    AsyncStorage.setItem(
      'authToken',
      JSON.stringify({
        logged_in: result.data.logged_in,
        token: result.data.token,
        user: result.data.user,
      }),
    );
    // setSessionDetails({
    //   logged_in: result.data.logged_in,
    //   user: result.data.user,
    //   message: result.data.message,
    // });
    // setShowAuthLoader(false);
  } catch (error) {
    AsyncStorage.setItem(
      'authToken',
      JSON.stringify({
        logged_in: error.response ? error.response.data.logged_in : false,
        token: error.response ? error.response.data.token : '',
      }),
    );
    // setSessionDetails({
    //   logged_in: error.response ? error.response.data.logged_in : false,
    //   user: error.response ? error.response.data.user : {},
    //   message: error.response ? error.response.data.message : error.message,
    // });
    // setShowAuthLoader(false);
  }
};

export default authCall;
