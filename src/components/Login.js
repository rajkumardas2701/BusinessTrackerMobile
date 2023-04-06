import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import authCall from '../utils/apiCalls';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = e => {
    const user = {phone, password};
    authCall(user);
    e.preventDefault();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.formHeading}>Login to Business Tracker</Text>
      <View style={styles.authForm}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Phone:</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            style={styles.input}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: 400,
  },
  authForm: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
    width: 300,
    marginTop: 60,
    marginLeft: 130,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 170,
    paddingHorizontal: 10,
  },
  formLabel: {
    fontWeight: '900',
  },
  formHeading: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 900,
    marginLeft: 120,
    marginTop: 40,
    fontSize: 20,
  },
});

export default Login;
