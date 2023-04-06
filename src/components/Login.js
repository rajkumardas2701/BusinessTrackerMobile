import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SessionContext from '../contexts/SessionContext';
import authCall from '../utils/apiCalls';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const {sessionDetails, setSessionDetails, showAuthLoader, setShowAuthLoader} =
    useContext(SessionContext);
  const handleLogin = e => {
    const user = {phone, password};
    authCall(user, setSessionDetails, 'login', setShowAuthLoader);
    e.preventDefault();
  };
  const handleFormCancel = e => {
    setPhone('');
    setPassword('');
    e.preventDefault();
  };
  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [sessionDetails]);
  return (
    <View style={styles.container}>
      <Text style={styles.formHeading}>Login to Business Tracker</Text>
      <View style={styles.authForm}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            style={styles.input}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={styles.formRow}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFormCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {showMessage && sessionDetails.message !== '' && (
          <Text style={styles.apiMsg}>{sessionDetails.message}</Text>
        )}
        {showAuthLoader && (
          <View style={styles.authLoaderContainer}>
            <ActivityIndicator color="blueviolet" size="large" />
          </View>
        )}
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
    marginBottom: 10,
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
  button: {
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authLoaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 9999,
    position: 'absolute',
    top: '100%',
    left: '50%',
  },
  apiMsg: {
    color: 'red',
    position: 'absolute',
    top: '110%',
    left: '20%',
  },
});

export default Login;
