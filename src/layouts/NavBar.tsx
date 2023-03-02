import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const NavBar = () => {
  const handleSignOut = () => {};
  return (<View style={styles.navbar}>
    <Text style={styles.text}>Business Tracker</Text>
    <Text style={styles.text}>Hi There</Text>
    <View style={styles.navBtn}>
      <Button 
        onPress={handleSignOut}
        title="Sign Out"
      />
    </View>
    
  </View>);
};
  
const styles = StyleSheet.create({
  navbar: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxHeight: 40,
    backgroundColor: 'blueviolet',
    alignItems: 'center',
  },
  navBtn: {
    maxHeight: 40,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});
export default NavBar;
