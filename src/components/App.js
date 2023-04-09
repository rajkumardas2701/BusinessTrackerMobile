/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import NavBar from '../layouts/NavBar';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionContext from '../contexts/SessionContext';
import Auth from '../containers/Auth';
import Dashboard from '../containers/Dashboard';

const App = () => {
  const [sessionDetails, setSessionDetails] = useState({
    logged_in: AsyncStorage.getItem('authToken')
      ? AsyncStorage.getItem('authToken').then(value => JSON.parse(value))
          .logged_in
      : false,
    user: AsyncStorage.getItem('authToken')
      ? AsyncStorage.getItem('authToken').then(value => JSON.parse(value)).user
      : {},
    message: '',
  });
  const [showAuthLoader, setShowAuthLoader] = useState(false);
  return (
    <ScrollView style={styles.appContainer}>
      <SessionContext.Provider
        value={{
          sessionDetails,
          setSessionDetails,
          showAuthLoader,
          setShowAuthLoader,
        }}>
        <NavBar />
        <View style={styles.loginform}>
          {AsyncStorage.getItem('authToken') && sessionDetails.logged_in ? (
            <Dashboard />
          ) : (
            <Auth />
          )}
          {console.log(AsyncStorage.getItem('authToken'))}
        </View>
      </SessionContext.Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 440,
    backgroundColor: 'white',
  },
  loginform: {
    maxWidth: 280,
    margin: 'auto',
  },
});

export default App;
