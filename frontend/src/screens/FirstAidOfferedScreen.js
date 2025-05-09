// src/screens/FirstAidOfferedScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

// Example data for first aid offered
const firstAidData = [
  {
    id: 'body_check',
    label: 'Body Check',
    icon: require('../assets/body_check.png')
  },
  {
    id: 'cpr',
    label: 'CPR',
    icon: require('../assets/cpr.png')
  },
  {
    id: 'doctor_informed',
    label: 'Doctor Informed',
    icon: require('../assets/doctor_informed.png')
  },
  {
    id: 'medication_given',
    label: 'Medication Given',
    icon: require('../assets/medication_given.png')
  },
  {
    id: 'emergency_services',
    label: 'Emergency Services',
    icon: require('../assets/emergency_services.png')
  },
  {
    id: 'fluids_offered',
    label: 'Fluids Offered',
    icon: require('../assets/fluids_offered.png')
  },
  {
    id: 'stable_position',
    label: 'Stable Position',
    icon: require('../assets/stable_position.png')
  },
  {
    id: 'wound_dressing',
    label: 'Wound Dressing',
    icon: require('../assets/wound_dressing.png')
  }
];

const FirstAidOfferedScreen = ({ route, navigation }) => {
  const { resident, condition, placeOfFall, vitals, aidsPresent, injuries } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFirstAid, setSelectedFirstAid] = useState([]);

  const filteredFirstAid = firstAidData.filter(aid =>
    aid.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAidPress = (aidId) => {
    if (selectedFirstAid.includes(aidId)) {
      setSelectedFirstAid(selectedFirstAid.filter((id) => id !== aidId));
    } else {
      setSelectedFirstAid([...selectedFirstAid, aidId]);
    }
  };

  const handleContinue = () => {
    navigation.navigate('FallIncidentReport', {
      resident,
      condition,
      placeOfFall,
      vitals,
      aidsPresent,
      injuries,
      firstAid: selectedFirstAid
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedFirstAid.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.tile, isSelected && styles.tileSelected]}
        onPress={() => handleAidPress(item.id)}
      >
        <View style={styles.tileContent}>
          <Image source={item.icon} style={styles.tileIcon} />
          <Text style={styles.tileLabel}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFirstAid}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>First Aid Offered</Text>
            <Text style={styles.headerSubtitle}>As Of Fall</Text>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.sortFilterRow}>
              <Text style={styles.sortText}>Sort By A-Z</Text>
              <Text style={styles.filterText}>Filter</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 100 }}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Home')}
        >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstAidOfferedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#2689F2',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerSubtitle: {
    color: '#fff',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  searchWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16
  },
  sortFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  sortText: {
    color: '#fff',
    fontWeight: '600'
  },
  filterText: {
    color: '#fff',
    fontWeight: '600'
  },
  gridContainer: {
    paddingBottom: 80,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  tile: {
    backgroundColor: '#33E4DB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
    aspectRatio: 1
  },
  tileSelected: {
    borderWidth: 2,
    borderColor: '#2689F2'
  },
  tileContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tileIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain'
  },
  tileLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center'
  },
  continueButton: {
    backgroundColor: '#2689F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10
    // 🔥 Removed absolute positioning to prevent overlap
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#E9F6FE',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  navItem: {
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 24
  },
  navLabel: {
    fontSize: 10,
    color: '#05BFD4'
  }
});
