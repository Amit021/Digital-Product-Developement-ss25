// src/screens/ProfileEditScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMyProfile, updateMyProfile } from '../services/api';

const ProfileEditScreen = ({ navigation }) => {
  // Local state for profile fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states for avatar picker and date picker
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Avatar options
  const avatarOptions = [
    'https://placekitten.com/300/300',
    'https://picsum.photos/300/300?random=1',
    'https://picsum.photos/300/300?random=2',
    'https://picsum.photos/300/300?random=3',
    'https://picsum.photos/300/300?random=4',
    'https://picsum.photos/300/300?random=5',
    'https://picsum.photos/300/300?random=6',
    'https://picsum.photos/300/300?random=7',
  ];

  // Fetch the current nurse’s profile from backend on mount
  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMyProfile();
        if (me) {
          setFullName(me.fullName || '');
          setPhoneNumber(me.phone || '');
          setEmail(me.email || '');
          setDateOfBirth(me.dateOfBirth || '');
          setSelectedAvatar(me.avatarUrl || '');
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        Alert.alert('Error', 'Could not load your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUpdateProfile = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Build updated profile object
    const updatedProfile = {
      fullName: fullName.trim(),
      phone: phoneNumber.trim(),
      avatarUrl: selectedAvatar,
      dateOfBirth,
    };

    try {
      setLoading(true);
      const newProfile = await updateMyProfile(updatedProfile);
      Alert.alert('Success', 'Profile updated!');
      // Navigate back to Profile screen; pass updated data
      navigation.navigate('Profile', { profile: newProfile });
    } catch (err) {
      console.error('Error updating profile:', err);
      Alert.alert('Error', err.message || 'Could not update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
  };

  const handleDateSelect = (day, month, year) => {
    if (day && month && year) {
      const formatted = `${day.padStart(2, '0')} / ${month.padStart(2, '0')} / ${year}`;
      setDateOfBirth(formatted);
    }
    setShowDatePicker(false);
  };

  const DatePickerModal = () => {
    const [selectedDay, setSelectedDay] = useState(
      dateOfBirth ? dateOfBirth.split(' / ')[0] : ''
    );
    const [selectedMonth, setSelectedMonth] = useState(
      dateOfBirth ? dateOfBirth.split(' / ')[1] : ''
    );
    const [selectedYear, setSelectedYear] = useState(
      dateOfBirth ? dateOfBirth.split(' / ')[2] : ''
    );

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

    return (
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerModal}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            <View style={styles.datePickerContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Day</Text>
                <ScrollView style={styles.dateScroll} showsVerticalScrollIndicator={false}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dateOption,
                        selectedDay === day && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedDay === day && styles.selectedDateOptionText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Month</Text>
                <ScrollView style={styles.dateScroll} showsVerticalScrollIndicator={false}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.dateOption,
                        selectedMonth === month && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedMonth(month)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedMonth === month && styles.selectedDateOptionText,
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Year</Text>
                <ScrollView style={styles.dateScroll} showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.dateOption,
                        selectedYear === year && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          selectedYear === year && styles.selectedDateOptionText,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => handleDateSelect(selectedDay, selectedMonth, selectedYear)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const AvatarSelectionModal = () => (
    <Modal
      visible={showAvatarModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowAvatarModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.avatarModal}>
          <Text style={styles.modalTitle}>Choose Avatar</Text>
          <ScrollView contentContainerStyle={styles.avatarGrid}>
            {avatarOptions.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.selectedAvatarOption,
                ]}
                onPress={() => {
                  setSelectedAvatar(avatar);
                  setShowAvatarModal(false);
                }}
              >
                <Image source={{ uri: avatar }} style={styles.avatarOptionImage} />
                {selectedAvatar === avatar && (
                  <View style={styles.avatarCheckmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setShowAvatarModal(false)}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.centeredOverlay}>
        <ActivityIndicator size="large" color="#2689F2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsNavigation}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: selectedAvatar }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editImageButton} onPress={() => setShowAvatarModal(true)}>
            <Text style={styles.editImageIcon}>📎</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Date Of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date Of Birth</Text>
          <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.textInput, !dateOfBirth && styles.placeholderText]}>
              {dateOfBirth || 'Select date of birth'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <AvatarSelectionModal />
      <DatePickerModal />
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centeredOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#2260FF',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 15,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#E0E0E0',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
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
    color: '#2260FF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#999',
  },
  updateButton: {
    backgroundColor: '#2260FF',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Avatar Modal
  avatarModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2260FF',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  avatarOption: {
    margin: 10,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedAvatarOption: {
    borderColor: '#2260FF',
  },
  avatarOptionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarCheckmark: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#2260FF',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2260FF',
  },
  // Date Picker Modal
  datePickerModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 200,
    marginBottom: 20,
  },
  dateColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2260FF',
  },
  dateScroll: {
    maxHeight: 160,
  },
  dateOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedDateOption: {
    backgroundColor: '#2260FF',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedDateOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E8F4FD',
  },
  confirmButton: {
    backgroundColor: '#2260FF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2260FF',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
