import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Puff} from 'react-native-loading-spinner-overlay';
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
            <Puff color="blueviolet" height={60} width={60} />
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
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: 165,
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
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
