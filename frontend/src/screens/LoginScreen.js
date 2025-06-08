// src/screens/LoginScreen.js

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
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const isFormValid = emailOrPhone.trim().length > 0 && password.trim().length > 0;

  const handleLoginPress = async () => {
    if (!isFormValid) {
      Alert.alert('Missing Fields', 'Please enter both email (or phone) and password.');
      return;
    }
    setLoading(true);
    try {
      await login({ email: emailOrPhone.trim(), password: password.trim() });
      navigation.replace('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Login Failed', err.message || 'Please check your credentials.');
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
        <Text style={styles.headerTitle}>Log In</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subtitleText}>
          Please sign in to continue.
        </Text>

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

        {/* Log In Button */}
        <TouchableOpacity
          style={[styles.loginButton, (!isFormValid || loading) && { opacity: 0.5 }]}
          onPress={handleLoginPress}
          disabled={!isFormValid || loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging In…' : 'Log In'}
          </Text>
        </TouchableOpacity>

        {/* “Don’t have an account? Sign Up” */}
        <View style={styles.bottomTextRow}>
          <Text style={styles.bottomText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.bottomText, styles.signUpLink]}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav (placeholder) */}
      <View style={styles.bottomNav}>
        {/* …your bottom nav code… */}
      </View>
    </View>
  );
};

export default LoginScreen;

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
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#05BFD4',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
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
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  eyeIconWrapper: { paddingHorizontal: 12 },
  loginButton: {
    backgroundColor: '#2689F2',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 35,
  },
  loginButtonText: {
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
  signUpLink: {
    color: '#05BFD4',
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#E9F6FE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 24 },
  navLabel: { fontSize: 10, color: '#05BFD4' },
});
