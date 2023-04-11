import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SessionContext from '../contexts/SessionContext';
import {authCall} from '../utils/apiCalls';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {sessionDetails, setSessionDetails, showAuthLoader, setShowAuthLoader} =
    useContext(SessionContext);

  const handleSubmit = e => {
    const user = {
      name,
      email,
      phone,
      password,
    };
    authCall(user, setSessionDetails, 'signup', setShowAuthLoader);
    e.preventDefault();
  };

  const handleFormCancel = e => {
    setPhone('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    e.preventDefault();
  };

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  }, [sessionDetails]);

  return (
    <View style={signupStyles.formContainer}>
      <Text style={signupStyles.formHeading}>Sign up to Business Tracker</Text>
      <View style={signupStyles.form}>
        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Name</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="First & last name"
            placeholderTextColor="gray"
            autoCapitalize="words"
            value={name}
            onChangeText={text => setName(text)}
            required
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Email</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Enter valid email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Phone</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Indian phone number"
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
            required
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Password</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            required
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Confirm Password</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Re-enter Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setIsDisabled(!(text === password));
            }}
            required
          />
        </View>

        <View style={signupStyles.buttonContainer}>
          <TouchableOpacity
            style={[
              signupStyles.button,
              isDisabled && signupStyles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isDisabled}>
            <Text style={signupStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={signupStyles.button}
            onPress={handleFormCancel}>
            <Text style={signupStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {isDisabled && confirmPassword !== '' && (
          <Text style={signupStyles.apiMsg}>Passwords don&apos;t match</Text>
        )}
        {showMessage && sessionDetails.message !== '' && (
          <Text style={signupStyles.apiMsg}>{sessionDetails.message}</Text>
        )}

        {showAuthLoader && (
          <View style={signupStyles.loaderContainer}>
            <ActivityIndicator color="blueviolet" size="large" />
          </View>
        )}
      </View>
    </View>
  );
};

const signupStyles = StyleSheet.create({
  formContainer: {
    width: 220,
    marginTop: 40,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 50,
    width: 300,
    alignItems: 'center',
    color: 'gray',
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    width: 350,
  },
  formElements: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 40,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    width: 165,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  apiMsg: {
    color: 'red',
    position: 'absolute',
    top: '107%',
    width: 350,
    textAlign: 'center',
    fontSize: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 9999,
    position: 'absolute',
    top: '110%',
    left: '50%',
  },
});

export default Signup;
