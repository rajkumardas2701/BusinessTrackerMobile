import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Puff} from 'react-native-loading-spinner-overlay';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {SafeAreaView} from 'react-native-safe-area-context';
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
    <View>
      <Text style={signupStyles.formHeading}>Sign up to Business Tracker</Text>
      <View style={signupStyles.form}>
        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Name:</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Firstname lastname"
            autoCapitalize="words"
            value={name}
            onChangeText={text => setName(text)}
            required
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Email:</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Enter valid email"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Phone:</Text>
          <TextInput
            style={signupStyles.formInput}
            placeholder="Indian Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
            required
          />
        </View>

        <View style={signupStyles.formElements}>
          <Text style={signupStyles.formLabel}>Password:</Text>
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
          <Text style={signupStyles.formLabel}>Confirm Password:</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  apiMsg: {
    color: 'red',
  },
});

export default Signup;
