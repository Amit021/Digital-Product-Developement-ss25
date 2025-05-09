// src/screens/InjuryAssessmentScreen.js

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

const injuriesData = [
  {
    id: 'ankle_sprain',
    label: 'Ankle Sprain',
    icon: require('../assets/ankle_sprain.png')
  },
  {
    id: 'head_injury',
    label: 'Head Injury',
    icon: require('../assets/head_injury.png')
  },
  {
    id: 'burns',
    label: 'Burns',
    icon: require('../assets/burns.png')
  },
  {
    id: 'cuts_scrapes',
    label: 'Cuts/Scrapes',
    icon: require('../assets/cuts_scrapes.png')
  },
  {
    id: 'fracture',
    label: 'Fracture',
    icon: require('../assets/fracture.png')
  },
  {
    id: 'hip_dislocation',
    label: 'Hip Dislocation',
    icon: require('../assets/hip_dislocation.png')
  },
  {
    id: 'knee_injury',
    label: 'Knee Injury',
    icon: require('../assets/knee_injury.png')
  },
  {
    id: 'neck_pain',
    label: 'Neck Pain',
    icon: require('../assets/neck_pain.png')
  }
];

const InjuryAssessmentScreen = ({ route, navigation }) => {
  const { resident, condition, placeOfFall, vitals, aidsPresent } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInjuries, setSelectedInjuries] = useState([]);

  const filteredInjuries = injuriesData.filter(injury =>
    injury.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInjuryPress = (injuryId) => {
    if (selectedInjuries.includes(injuryId)) {
      setSelectedInjuries(selectedInjuries.filter((id) => id !== injuryId));
    } else {
      setSelectedInjuries([...selectedInjuries, injuryId]);
    }
  };

  const handleContinue = () => {
    navigation.navigate('FirstAidOffered', {
      resident,
      condition,
      placeOfFall,
      vitals,
      aidsPresent,
      injuries: selectedInjuries
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedInjuries.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.tile, isSelected && styles.tileSelected]}
        onPress={() => handleInjuryPress(item.id)}
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
        data={filteredInjuries}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Injury Assessment</Text>
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

export default InjuryAssessmentScreen;

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
    // 🔥 Removed: position: 'absolute', bottom, left, right
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
