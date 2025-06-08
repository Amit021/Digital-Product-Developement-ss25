// src/screens/NotificationSettingsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch
} from 'react-native';

const NotificationSettingsScreen = ({ navigation }) => {
  // State for each notification setting
  const [notifications, setNotifications] = useState({
    general: true,
    sound: true,
    soundCall: true,
    vibrate: true,
    specialOffers: true,
    payments: true,
    promoAndDiscount: true
  });

  const handleBackButton = () => {
    navigation.goBack();
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const NotificationItem = ({ title, value, onToggle, hasSwitch = true }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{title}</Text>
      {hasSwitch ? (
        <Switch
          trackColor={{ false: '#E5E5E5', true: '#2260FF' }}
          thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#E5E5E5"
          onValueChange={onToggle}
          value={value}
          style={styles.switch}
        />
      ) : (
        <Switch
          trackColor={{ false: '#E5E5E5', true: '#E5E5E5' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E5E5"
          onValueChange={() => {}}
          value={false}
          disabled={true}
          style={styles.switch}
        />
      )}
    </View>
  );

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
        
        <Text style={styles.headerTitle}>Notification Setting</Text>
      </View>
      
      {/* Notification Settings */}
      <View style={styles.settingsContainer}>
        <NotificationItem
          title="General Notification"
          value={notifications.general}
          onToggle={() => toggleNotification('general')}
        />
        
        <NotificationItem
          title="Sound"
          value={notifications.sound}
          onToggle={() => toggleNotification('sound')}
        />
        
        <NotificationItem
          title="Sound Call"
          value={notifications.soundCall}
          onToggle={() => toggleNotification('soundCall')}
        />
        
        <NotificationItem
          title="Vibrate"
          value={notifications.vibrate}
          onToggle={() => toggleNotification('vibrate')}
        />
        
        <NotificationItem
          title="Special Offers"
          value={notifications.specialOffers}
          onToggle={() => toggleNotification('specialOffers')}
        />
        
        <NotificationItem
          title="Payments"
          value={notifications.payments}
          onToggle={() => toggleNotification('payments')}
        />
        
        <NotificationItem
          title="Promo And Discount"
          value={notifications.promoAndDiscount}
          onToggle={() => toggleNotification('promoAndDiscount')}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;

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
    paddingTop: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});