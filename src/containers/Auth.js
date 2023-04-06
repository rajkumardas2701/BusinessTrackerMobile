import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Login from '../components/Login';
import Signup from '../components/SignUp';
import SessionContext from '../contexts/SessionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
  const [loginType, setLoginType] = useState(true);
  const {setSessionDetails} = useContext(SessionContext);

  const switchAuthType = async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    const parsedAuthToken = JSON.parse(authToken);

    setSessionDetails({
      logged_in: parsedAuthToken ? parsedAuthToken.logged_in : false,
      user: parsedAuthToken ? parsedAuthToken.user : {},
      message: '',
    });

    setLoginType(!loginType);
  };

  return (
    <View style={styles.AuthBody}>
      {loginType ? <Login /> : <Signup />}
      {loginType ? (
        <View style={styles.switchAuth}>
          <Text>Don&apos;t have an account?</Text>
          <TouchableOpacity
            style={styles.formBtnSmall}
            onPress={switchAuthType}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.switchAuth}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={styles.formBtnSmall}
            onPress={switchAuthType}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  AuthBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchAuth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 130,
    width: 250,
  },
  formBtnSmall: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginLeft: 20,
  },
});

export default Auth;
