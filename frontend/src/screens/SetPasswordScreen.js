// src/screens/SetPasswordScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);

  const handleCreate = () => {
    if (!password || password !== confirm) {
      // Show some alert, or disable button until they match
      return;
    }
    // Once done, navigate back to login or home
    navigation.replace('Login');
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
        <Text style={styles.headerTitle}>Set Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Description / Lorem Ipsum */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        {/* Password Field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputField, { flex: 1 }]}
              placeholder="••••••••••••"
              placeholderTextColor="#05BFD4"
              secureTextEntry={secureText1}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureText1(!secureText1)}
              style={styles.eyeIconWrapper}
            >
              <MaterialIcons
                name={secureText1 ? 'visibility-off' : 'visibility'}
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
              secureTextEntry={secureText2}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity
              onPress={() => setSecureText2(!secureText2)}
              style={styles.eyeIconWrapper}
            >
              <MaterialIcons
                name={secureText2 ? 'visibility-off' : 'visibility'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* “Create New Password” Button */}
        <TouchableOpacity
          style={[
            styles.createButton,
            (!password || password !== confirm) && { opacity: 0.5 },
          ]}
          onPress={handleCreate}
          disabled={!password || password !== confirm}
        >
          <Text style={styles.createButtonText}>Create New Password</Text>
        </TouchableOpacity>

        {/* Spacer so Bottom Nav doesn’t cover content */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔒</Text>
          <Text style={styles.navLabel}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* ─── Header ─────────────────────────────────────────────────── */
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

  /* ─── Content Container ───────────────────────────────────────── */
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'left',
  },

  /* ─── Inputs ──────────────────────────────────────────────────── */
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

  /* ─── Button ──────────────────────────────────────────────────── */
  createButton: {
    backgroundColor: '#2689F2',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 35,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  /* ─── Bottom Nav PLACEHOLDER ─────────────────────────────────── */
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
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 10,
    color: '#05BFD4',
  },
});
