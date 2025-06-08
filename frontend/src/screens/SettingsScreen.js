// src/screens/SettingsScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleNotificationSettings = () => {
    navigation.navigate('NotificationSettings');
  };

  const handlePasswordManager = () => {
    navigation.navigate('PasswordManager');
  };

  const handlePrivacyPolicy = () => {
    // TODO: Navigate to privacy policy or show modal
    console.log('Privacy Policy pressed');
  };

  const handleHelp = () => {
    // TODO: Navigate to help section or show modal
    console.log('Help pressed');
  };

  const handleAbout = () => {
    // TODO: Navigate to about section or show modal
    console.log('About pressed');
  };

  const handleLogout = () => {
    // TODO: Show logout confirmation and handle logout
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" />
      
      {/* Blue Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackButton}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      {/* Settings Options */}
      <ScrollView style={styles.settingsContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleNotificationSettings}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>💡</Text>
          </View>
          <Text style={styles.settingText}>Notification Setting</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handlePasswordManager}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🔐</Text>
          </View>
          <Text style={styles.settingText}>Password Manager</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
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
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  settingsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoutIconCircle: {
    backgroundColor: '#FF4444',
  },
  iconText: {
    fontSize: 20,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  logoutText: {
    color: '#FF4444',
  },
  chevron: {
    fontSize: 20,
    color: '#2260FF',
    fontWeight: 'bold',
  },
  divider: {
    height: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  },
});