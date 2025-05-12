// src/screens/ProfileScreen.js

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" />
      
      {/* Blue Header with profile image and info */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Profile</Text>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://placekitten.com/300/300' }} // Replace with actual user image
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Text style={styles.editImageIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jane Doe</Text>
            <Text style={styles.profilePhone}>030 8675432</Text>
            <Text style={styles.profileEmail}>Janedoe@example.com</Text>
          </View>
        </View>
      </View>
      
      {/* Settings Options */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <Text style={styles.settingText}>Profile</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>❤️</Text>
          </View>
          <Text style={styles.settingText}>Favorite</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🔒</Text>
          </View>
          <Text style={styles.settingText}>Privacy Policy</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>⚙️</Text>
          </View>
          <Text style={styles.settingText}>Settings</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>❓</Text>
          </View>
          <Text style={styles.settingText}>Help</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>↪️</Text>
          </View>
          <Text style={styles.settingText}>Logout</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#2260FF',
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  editImageIcon: {
    fontSize: 18,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profilePhone: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 3,
  },
  profileEmail: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2689F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  settingText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  chevron: {
    fontSize: 24,
    color: '#33E4DB',
    fontWeight: 'bold',
  },
});