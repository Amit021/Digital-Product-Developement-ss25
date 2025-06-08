// src/screens/PasswordManagerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { changePassword } from '../services/api';   // NEW

const PasswordManagerScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword]   = useState('');
  const [newPassword, setNewPassword]           = useState('');
  const [confirmPassword, setConfirmPassword]   = useState('');

  const [showCurrentPassword, setShowCurrent]   = useState(false);
  const [showNewPassword, setShowNew]           = useState(false);
  const [showConfirmPassword, setShowConfirm]   = useState(false);

  const [isSubmitting, setSubmitting]           = useState(false); // NEW

  /* ────────────────────────── helpers ────────────────────────── */
  const togglePasswordVisibility = (field) => {
    if (field === 'current')  setShowCurrent(!showCurrentPassword);
    if (field === 'new')      setShowNew(!showNewPassword);
    if (field === 'confirm')  setShowConfirm(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long.');
      return;
    }

    try {
      setSubmitting(true);
      await changePassword({ currentPassword, newPassword });  // ← API call
      Alert.alert('Success', 'Password changed successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────── render ─────────────────────────── */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password Manager</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {[
          {
            label: 'Current Password',
            value: currentPassword,
            setValue: setCurrentPassword,
            show: showCurrentPassword,
            field: 'current',
          },
          {
            label: 'New Password',
            value: newPassword,
            setValue: setNewPassword,
            show: showNewPassword,
            field: 'new',
          },
          {
            label: 'Confirm New Password',
            value: confirmPassword,
            setValue: setConfirmPassword,
            show: showConfirmPassword,
            field: 'confirm',
          },
        ].map(({ label, value, setValue, show, field }) => (
          <View style={styles.fieldContainer} key={field}>
            <Text style={styles.fieldTitle}>{label}</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={value}
                onChangeText={setValue}
                secureTextEntry={!show}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility(field)}
              >
                <Text style={styles.eyeIcon}>{show ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
            {field === 'current' && (
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() =>
                  Alert.alert(
                    'Forgot Password',
                    'Password recovery functionality will be implemented soon.'
                  )
                }
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            isSubmitting && { opacity: 0.6 },
          ]}
          onPress={handleChangePassword}
          disabled={isSubmitting}
        >
          <Text style={styles.changePasswordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordManagerScreen;

/* ───────────────────── styles (unchanged) ───────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerContainer: {
    backgroundColor: '#2260FF',
    paddingTop: 10,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  formContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  fieldContainer: { marginBottom: 30 },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  passwordInput: { flex: 1, fontSize: 16, color: '#2260FF', fontWeight: '500' },
  eyeButton: { padding: 5 },
  eyeIcon: { fontSize: 18, color: '#2260FF' },
  forgotPasswordButton: { alignSelf: 'flex-end', marginTop: 10 },
  forgotPasswordText: {
    color: '#2260FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  changePasswordButton: {
    backgroundColor: '#2260FF',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  changePasswordButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
