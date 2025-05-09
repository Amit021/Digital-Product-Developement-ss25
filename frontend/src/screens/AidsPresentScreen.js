// src/screens/AidsPresentScreen.js test

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

const aidsData = [
  {
    id: 'hearing_aid',
    label: 'Hearing Aid',
    icon: require('../assets/hearing_aid.png')
  },
  {
    id: 'shoes',
    label: 'Shoes',
    icon: require('../assets/shoes.png')
  },
  {
    id: 'spectacles',
    label: 'Spectacles',
    icon: require('../assets/spectacles.png')
  },
  {
    id: 'walking_stick',
    label: 'Walking Stick',
    icon: require('../assets/walking_stick.png')
  },
  {
    id: 'walker',
    label: 'Walker',
    icon: require('../assets/walker.png')
  },
  {
    id: 'wheel_chair',
    label: 'Wheel Chair',
    icon: require('../assets/wheel_chair.png')
  }
];

const AidsPresentScreen = ({ route, navigation }) => {
  const { resident, condition, placeOfFall, vitals } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAids, setSelectedAids] = useState([]);

  const filteredAids = aidsData.filter((aid) =>
    aid.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAidPress = (aidId) => {
    if (selectedAids.includes(aidId)) {
      setSelectedAids(selectedAids.filter((id) => id !== aidId));
    } else {
      setSelectedAids([...selectedAids, aidId]);
    }
  };

  const handleContinue = () => {
    if (selectedAids.length === 0) {
      Alert.alert('No Aids Selected', 'Please select at least one aid or skip if none.');
      return;
    }
    navigation.navigate('InjuryAssessment', {
      resident,
      condition,
      placeOfFall,
      vitals,
      aidsPresent: selectedAids
    });
  };

  const renderAidItem = ({ item }) => {
    const isSelected = selectedAids.includes(item.id);
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
        data={filteredAids}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderAidItem}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Aids Present</Text>
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

      {/* Bottom Nav (fixed) */}
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

export default AidsPresentScreen;

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
    // 🔥 Removed: position, left, right, bottom
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
