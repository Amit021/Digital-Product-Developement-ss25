// src/screens/ProfileScreen.js
/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { fetchMyProfile } from '../services/api'

const ProfileScreen = ({ navigation, route }) => {
  /* ─── Local profile state ─────────────────────────────────── */
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    avatarUrl: 'https://placekitten.com/300/300',
    dateOfBirth: '',
  })

  /* ─── 1) On focus, fetch from GET /me ───────────────────────── */
  useFocusEffect(
    useCallback(() => {
      let isActive = true

      ;(async () => {
        try {
          const me = await fetchMyProfile()
          if (isActive && me) {
            // populate local state with whatever came back
            setProfile({
              fullName: me.fullName || '',
              phone: me.phone || '',
              email: me.email || '',
              avatarUrl: me.avatarUrl || 'https://placekitten.com/300/300',
              dateOfBirth: me.dateOfBirth?.split('T')[0] || '',
            })
          }
        } catch (err) {
          console.error('Error loading my profile:', err)
          Alert.alert('Error', 'Could not load profile')
        }
      })()

      return () => {
        isActive = false
      }
    }, [])
  )

  /* ─── 2) If coming back from Edit, merge updates ───────────── */
  useEffect(() => {
    if (route.params?.updatedProfile) {
      setProfile((prev) => ({ ...prev, ...route.params.updatedProfile }))
      navigation.setParams({ updatedProfile: null })
    }
  }, [route.params?.updatedProfile, navigation])

  /* ─── 3) Helper to render each row ────────────────────────── */
  const renderRow = (label, icon, onPress) => (
    <TouchableOpacity key={label} style={styles.settingItem} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.settingText}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  )

  /* ─── 4) Row definitions ─────────────────────────────────── */
  const rows = [
    {
      label: 'Edit Profile',
      icon: '👤',
      onPress: () => navigation.navigate('ProfileEdit', { profile }),
    },
    {
      label: 'Favorites',
      icon: '❤️',
      onPress: () => Alert.alert('Favorites', 'Coming soon…'),
    },
    {
      label: 'Privacy Policy',
      icon: '🔒',
      onPress: () => Alert.alert('Privacy Policy', 'Coming soon…'),
    },
    {
      label: 'Settings',
      icon: '⚙️',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      label: 'Help',
      icon: '❓',
      onPress: () => Alert.alert('Help', 'Contact support@example.com'),
    },
    {
      label: 'Logout',
      icon: '↪️',
      onPress: async () => {
        // clear tokens & profile
        await AsyncStorage.removeItem('authToken')
        await AsyncStorage.removeItem('userFullName')
        await AsyncStorage.removeItem('nurseProfile')
        navigation.replace('Login')
      },
    },
  ]

  /* ─── 5) UI ──────────────────────────────────────────────── */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" />

      {/* ── Blue Header ─────────────────────────────────────────── */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>

        {/* ── Profile Card ─────────────────────────────────────── */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profile.avatarUrl }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={() => navigation.navigate('ProfileEdit', { profile })}
            >
              <Text style={styles.editImageIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.fullName || '–'}</Text>
            {!!profile.phone && <Text style={styles.profilePhone}>{profile.phone}</Text>}
            {!!profile.email && <Text style={styles.profileEmail}>{profile.email}</Text>}
            {!!profile.dateOfBirth && (
              <Text style={styles.profileBirthDate}>Born: {profile.dateOfBirth}</Text>
            )}
          </View>
        </View>
      </View>

      {/* ── Scrollable Settings List ───────────────────────────── */}
      <ScrollView
        contentContainerStyle={styles.settingsContainer}
        showsVerticalScrollIndicator={false}
      >
        {rows.map((row) => renderRow(row.label, row.icon, row.onPress))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

/* ───────────────────────── styles ──────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  /* Header + Profile Card */
  headerContainer: { backgroundColor: '#2260FF', paddingTop: 10, paddingBottom: 30 },
  backButton: { position: 'absolute', top: 10, left: 15, zIndex: 10 },
  backButtonText: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: { fontSize: 20, color: '#FFFFFF' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  profileSection: { alignItems: 'center' },
  profileImageContainer: { position: 'relative', marginBottom: 15 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#FFFFFF' },
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
  },
  editImageIcon: { fontSize: 18 },
  profileInfo: { alignItems: 'center' },
  profileName: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  profilePhone: { color: '#FFFFFF', fontSize: 18, marginBottom: 3 },
  profileEmail: { color: '#FFFFFF', fontSize: 18, marginBottom: 3 },
  profileBirthDate: { color: '#FFFFFF', fontSize: 16, opacity: 0.9 },

  /* Settings List */
  settingsContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2689F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: { fontSize: 20, color: '#FFFFFF' },
  settingText: { flex: 1, fontSize: 18, fontWeight: '500', color: '#000000' },
  chevron: { fontSize: 20, color: '#33E4DB', fontWeight: 'bold' },
})
