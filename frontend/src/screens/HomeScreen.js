// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { fetchAllResidents } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    const loadResidents = async () => {
      try {
        const data = await fetchAllResidents();
        setResidents(data);
      } catch (error) {
        console.error('Error fetching residents:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResidents();
  }, []);

  // Filter residents by name
  const filteredResidents = residents.filter(item => {
    const resource = item.resource;
    if (!resource.name || !resource.name[0]) return false;
    const fullName = resource.name[0].given.join(' ') + ' ' + resource.name[0].family;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderResident = ({ item }) => {
    const resource = item.resource;
    const fullName = resource.name[0].given.join(' ') + ' ' + resource.name[0].family;
    const isSelected = selectedResident && selectedResident.id === resource.id;
    return (
      <TouchableOpacity
        style={[
          styles.residentItem,
          isSelected && { backgroundColor: '#E9F6FE' }
        ]}
        onPress={() => navigation.navigate('FallDetails', { resident: resource })}
      >
        <Text style={styles.residentName}>{fullName} (ID: {resource.id})</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2689F2" />
        <Text>Loading residents...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Icons on the left */}
        <View style={styles.topIconsLeft}>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
        </View>
        {/* Welcome user profile on the right */}
        <View style={styles.userProfileContainer}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.welcomeText}>Hi, WelcomeBack</Text>
            <Text style={styles.userName}>Jane Doe</Text>
          </View>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: 'https://placekitten.com/60/60' }} // Replace with actual user image
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      {/* Actions Row */}
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
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            Alert.alert('Info', 'Feature coming soon.');
          }}
        >

          <Text style={styles.actionIcon}>🏃‍♂️</Text>
          <Text style={styles.actionLabel}>Fall History</Text>
        </TouchableOpacity>
      </View>

      {/* Search Field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Residents List WB3</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Residents List */}
      <FlatList
        data={filteredResidents}
        keyExtractor={(item) => item.resource.id}
        renderItem={renderResident}
        style={styles.residentsList}
      />

      

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>✉️</Text>
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 45,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topIconsLeft: {
    flexDirection: 'row'
  },
  iconCircle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#E9F6FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  iconText: {
    fontSize: 14
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  welcomeText: {
    fontFamily: 'League Spartan',
    fontSize: 13,
    color: '#05BFD4',
    textTransform: 'capitalize'
  },
  userName: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    color: '#252525',
    marginTop: 2
  },
  profileImageWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 8,
    backgroundColor: '#E9F6FE'
  },
  profileImage: {
    width: '100%',
    height: '100%'
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  actionItem: {
    alignItems: 'center'
  },
  actionIcon: {
    fontSize: 20,
    borderColor: '#2260FF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 3
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#05BFD4'
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20
  },
  listTitle: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#05BFD4'
  },
  seeAllText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#05BFD4'
  },
  residentsList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20
  },
  residentItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20
  },
  residentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#252525'
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#E9F6FE',
    height: 67,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  navItem: {
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2
  },
  navLabel: {
    fontSize: 10,
    color: '#05BFD4'
  },
  conditionButton: {
    backgroundColor: '#2689F2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20
  },
  conditionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
