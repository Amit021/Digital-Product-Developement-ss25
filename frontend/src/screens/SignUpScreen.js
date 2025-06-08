// src/screens/SignUpScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { signUp } from '../services/api';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const isFormValid =
    fullName.trim().length > 0 &&
    emailOrPhone.trim().length > 0 &&
    password.trim().length > 0 &&
    password === confirmPassword;

  const handleSignUpPress = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Missing/Invalid Fields',
        'Make sure you filled all fields and both passwords match.'
      );
      return;
    }
    setLoading(true);
    try {
      // Call signUp() from api.js
      await signUp({
        email: emailOrPhone.trim(),
        password: password.trim(),
        fullName: fullName.trim(),
      });
      // At this point, AsyncStorage now holds authToken + userFullName
      navigation.replace('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Sign Up Failed', err.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Full Name Field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your full name"
            placeholderTextColor="#05BFD4"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email / Mobile Field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email or Mobile Number</Text>
          <TextInput
            style={styles.inputField}
            placeholder="random.user1@email.com"
            placeholderTextColor="#05BFD4"
            keyboardType="email-address"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="••••••••••••"
              placeholderTextColor="#05BFD4"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={styles.eyeIconWrapper}
            >
              <MaterialIcons
                name={secureText ? 'visibility-off' : 'visibility'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="••••••••••••"
              placeholderTextColor="#05BFD4"
              secureTextEntry={secureText}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={styles.eyeIconWrapper}
            >
              <MaterialIcons
                name={secureText ? 'visibility-off' : 'visibility'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, (!isFormValid || loading) && { opacity: 0.5 }]}
          onPress={handleSignUpPress}
          disabled={!isFormValid || loading}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Signing Up…' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* “Already have an account? Log In” */}
        <View style={styles.bottomTextRow}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.bottomText, styles.loginLink]}> Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#2689F2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 50,
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputWrapper: {
    marginTop: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#252525',
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: '#EAF9FC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIconWrapper: {
    paddingHorizontal: 12,
  },
  signUpButton: {
    backgroundColor: '#2689F2',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 35,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  bottomText: {
    fontSize: 14,
    color: '#555',
  },
  loginLink: {
    color: '#05BFD4',
    fontWeight: '600',
  },
});
