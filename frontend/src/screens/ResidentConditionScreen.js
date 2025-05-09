// src/screens/ResidentConditionScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert
} from 'react-native';

// Example data for "Residents Condition"
const conditionData = [
  { id: 'conscious', label: 'Conscious', icon: require('../assets/conscious.png') },
  { id: 'unconscious', label: 'UnConscious', icon: require('../assets/unconscious.png') },
  { id: 'oriented', label: 'Oriented', icon: require('../assets/oriented.png') },
  { id: 'disoriented', label: 'Disoriented', icon: require('../assets/disoriented.png') },
  { id: 'talkative', label: 'Talkative', icon: require('../assets/talkative.png') },
  { id: 'non_talkative', label: 'Non Talkative', icon: require('../assets/non_talkative.png') },
];

const ResidentConditionScreen = ({ route, navigation }) => {
  const { resident, placeOfFall } = route.params || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState(null);

  const filteredConditions = conditionData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConditionPress = (conditionId) => {
    setSelectedCondition(conditionId);
  };

  const handleContinue = () => {
    if (!selectedCondition) {
      Alert.alert('Error', 'Please select a condition');
      return;
    }
    navigation.navigate('VitalMeasurements', {
      resident,
      condition: selectedCondition,
      placeOfFall
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedCondition;
    return (
      <TouchableOpacity
        style={[styles.tile, isSelected && styles.tileSelected]}
        onPress={() => handleConditionPress(item.id)}
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
        data={filteredConditions}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Residents Condition</Text>
            <Text style={styles.headerSubtitle}>As Of Found</Text>

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
            <TouchableOpacity
              style={[styles.continueButton, !selectedCondition && { opacity: 0.5 }]}
              onPress={handleContinue}
              disabled={!selectedCondition}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Fixed Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResidentConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // Header
  header: {
    backgroundColor: '#2260FF',
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
