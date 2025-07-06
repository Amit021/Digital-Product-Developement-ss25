// src/screens/HomeScreen.js
/* eslint-disable prettier/prettier */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllResidents } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [residents, setResidents]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [searchQuery, setSearchQuery]     = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);

  // State to hold the nurse's full name (read from AsyncStorage)
  const [userName, setUserName] = useState('');

  /* ─────────────────────────────────────────────────────────
     1) Load all residents (from real backend) once on mount
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllResidents();
        setResidents(data);
      } catch (err) {
        console.error('Error fetching residents:', err);
        Alert.alert('Error', 'Could not load residents. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─────────────────────────────────────────────────────────
     2) Re‐read the logged-in nurse's name from AsyncStorage
        Every time this screen comes into focus
  ───────────────────────────────────────────────────────── */
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        try {
          const name = await AsyncStorage.getItem('userFullName');
          if (isActive && name) {
            setUserName(name);
          }
        } catch (err) {
          console.error('Error reading userFullName from storage', err);
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  /* ─────────────────────────────────────────────────────────
     3) Helpers
  ───────────────────────────────────────────────────────── */
  const filteredResidents = residents.filter((r) =>
    r?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderResident = ({ item: resident }) => (
    <TouchableOpacity
      style={styles.residentItem}
      onPress={() => navigation.navigate('FallDetails', { resident })}
    >
      <Text style={styles.residentName}>
        {resident.name} (ID: {resident.id})
      </Text>
    </TouchableOpacity>
  );

  /* ─────────────────────────────────────────────────────────
     4) Logout function
  ───────────────────────────────────────────────────────── */
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Clear all stored user data
              await AsyncStorage.multiRemove(['userFullName', 'userToken', 'userId']);
              
              // Navigate to login screen and reset the navigation stack
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  /* ─────────────────────────────────────────────────────────
     5) Early-out loading UI
  ───────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2689F2" />
        <Text>Loading residents…</Text>
      </View>
    );
  }

  /* ─────────────────────────────────────────────────────────
     6) Main UI
  ───────────────────────────────────────────────────────── */
  return (
    <View style={styles.container}>
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <View style={styles.topIconsLeft}>
          {/* Bell → go to NotificationSettings */}
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>

          {/* Gear → go to Settings */}
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>

          {/* Search icon (no action hooked up) */}
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userProfileContainer}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
            <Text style={styles.userName}>
              {userName ? userName : 'Guest'}
            </Text>
          </View>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: 'https://placekitten.com/60/60' }}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      {/* ── Action Tiles ──────────────────────────────────── */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionLabel}>Vitals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>👨‍⚕️</Text>
          <Text style={styles.actionLabel}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>💊</Text>
          <Text style={styles.actionLabel}>Mediplan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>👨‍👩‍👧‍👦</Text>
          <Text style={styles.actionLabel}>Relatives</Text>
        </TouchableOpacity>

        {/* Fall History → opens resident picker */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            if (residents.length === 0) {
              Alert.alert('No residents', 'There are no residents to choose.');
              return;
            }
            setPickerVisible(true);
          }}
        >
          <Text style={styles.actionIcon}>🏃‍♂️</Text>
          <Text style={styles.actionLabel}>Fall History</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search Bar ──────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name…"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ── List Header ─────────────────────────────────────── */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Residents List</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* ── Residents List ─────────────────────────────────── */}
      <FlatList
        data={filteredResidents}
        keyExtractor={(r) => String(r.id)}
        renderItem={renderResident}
        style={styles.residentsList}
      />

      {/* ── Bottom Nav ─────────────────────────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>        
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={handleLogout}
        >
          <Text style={styles.navIcon}>↪️</Text>
          <Text style={styles.navLabel}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* ── Resident Picker Modal ──────────────────────────── */}
      <Modal visible={pickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Resident</Text>

            <FlatList
              data={residents}
              keyExtractor={(r) => String(r.id)}
              style={{ maxHeight: '70%' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setPickerVisible(false);
                    navigation.navigate('PreviousReports', { resident: item });
                  }}
                >
                  <Text style={styles.modalItemText}>
                    {item.name} (ID: {item.id})
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

/* ─────────────────────────────────────────────────────────────────────────────
   Styles for HomeScreen
──────────────────────────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topIconsLeft: { flexDirection: 'row' },
  iconCircle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#E9F6FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: { fontSize: 14 },
  userProfileContainer: { flexDirection: 'row', alignItems: 'center' },
  welcomeText: {
    fontFamily: 'League Spartan',
    fontSize: 13,
    color: '#05BFD4',
    textTransform: 'capitalize',
  },
  userName: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    color: '#252525',
    marginTop: 2,
  },
  profileImageWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 8,
    backgroundColor: '#E9F6FE',
  },
  profileImage: { width: '100%', height: '100%' },

  /* Action tiles */
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionItem: { alignItems: 'center' },
  actionIcon: {
    fontSize: 20,
    borderColor: '#2260FF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 3,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#05BFD4',
  },

  /* Search */
  searchContainer: { paddingHorizontal: 20, marginTop: 10 },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  /* List header */
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#05BFD4',
  },
  seeAllText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#05BFD4',
  },

  /* Resident list */
  residentsList: { flex: 1, marginTop: 10 },
  residentItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
  },
  residentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#252525',
  },

  /* Bottom nav */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#E9F6FE',
    height: 67,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 20, marginBottom: 2 },
  navLabel: { fontSize: 10, color: '#05BFD4' },

  /* ── Modal styles ───────────────────────────────────────── */
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#05BFD4',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 14,
    color: '#252525',
  },
  modalCancel: { marginTop: 10, alignSelf: 'center' },
  modalCancelText: { color: '#2689F2', fontSize: 14 },
});