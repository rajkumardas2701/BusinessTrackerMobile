// import React from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';

// const NavBar = () => {
//   const handleSignOut = () => {};
//   return (
//     <View style={styles.navbar}>
//       <Text style={styles.text}>BusinessTracker</Text>
//       <Text style={styles.text}>Hi there</Text>
//       <View style={styles.navBtn}>
//         <Button onPress={handleSignOut} title="Sign Out" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   navbar: {
//     flex: 3,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     maxHeight: 40,
//     backgroundColor: 'blueviolet',
//     alignItems: 'center',
//   },
//   navBtn: {
//     maxHeight: 40,
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default NavBar;

import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import SessionContext from '../contexts/SessionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
  const {sessionDetails, setSessionDetails} = useContext(SessionContext);

  const handleSignOut = e => {
    AsyncStorage.removeItem('authToken');
    setSessionDetails({
      logged_in: false,
      user: {},
      message: '',
    });
    e.preventDefault();
  };

  return (
    <View style={styles.navbarBody}>
      <Text style={styles.navLogo}>BUSINESS TRACKER</Text>
      <View style={styles.userGreet}>
        <Text style={styles.navbarName}>Hi,&nbsp;</Text>
        <Text style={styles.navbarName}>
          {sessionDetails.user && sessionDetails.user.name
            ? sessionDetails.user.name.split(' ')[0]
            : 'there'}
        </Text>
      </View>
      {sessionDetails.logged_in && (
        <TouchableOpacity onPress={handleSignOut} style={styles.signoutBtn}>
          <Text style={styles.signoutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blueviolet',
    height: 50,
    paddingRight: 40,
  },
  navLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
  },
  navLogoShort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLogoText: {
    fontSize: 12,
    lineHeight: 16,
  },
  userGreet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  navbarName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  signoutBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  signoutText: {
    fontSize: 14,
    color: '#333',
  },
});

export default NavBar;
