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

// If you want an actual gradient for the tiles, install react-native-linear-gradient
// import LinearGradient from 'react-native-linear-gradient';

// Example data for places
const placesData = [
  { id: 'Bathroom', label: 'Bathroom', icon: require('../assets/bathroom.png') },
  { id: 'Bed', label: 'Bed', icon: require('../assets/bed.png') },
  { id: 'Floor Hallway', label: 'Floor Hallway', icon: require('../assets/floor_hallway.png') },
  { id: 'Dining Room', label: 'Dining Room', icon: require('../assets/dining_room.png') },
  { id: 'Kitchen', label: 'Kitchen', icon: require('../assets/kitchen.png') },
  { id: 'Living Room', label: 'Living Room', icon: require('../assets/living_room.png') },
  { id: 'Stairs', label: 'Stairs', icon: require('../assets/stairs.png') },
  { id: 'Sofa', label: 'Sofa', icon: require('../assets/sofa.png') }
];

const FallDetailsScreen = ({ route, navigation }) => {
  // If you pass a resident from the previous screen, you can get it here:
  const { resident } = route.params || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Filter places by the search query
  const filteredPlaces = placesData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // When a place tile is pressed, store its ID
  const handlePlacePress = (placeId) => {
    setSelectedPlace(placeId);
  };

  const handleContinue = () => {
    if (!selectedPlace) {
      Alert.alert('Error', 'Please select a place of fall');
      return;
    }
    const selectedPlaceData = placesData.find(p => p.id === selectedPlace);
    navigation.navigate('ResidentCondition', { 
      resident, 
      placeOfFall: selectedPlaceData 
    });
  }; 

  // Render each place tile
  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedPlace;
    return (
      <TouchableOpacity
        style={[styles.tile, isSelected && styles.tileSelected]}
        onPress={() => handlePlacePress(item.id)}
      >
        {/* 
          If you want an actual gradient, wrap the contents in a <LinearGradient> 
          For example:
          <LinearGradient
            colors={['#33E4DB', '#00BBD3']}
            style={styles.gradientTile}
          >
            <Image ... />
            <Text ... />
          </LinearGradient>
        */}
        <View style={styles.tileContent}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.tileLabel}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlaces}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Place Of Fall</Text>
            <Text style={styles.headerSubtitle}>Wohnbereich 3</Text>

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
              style={[styles.continueButton, !selectedPlace && { opacity: 0.5 }]}
              onPress={handleContinue}
              disabled={!selectedPlace}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.gridContainer}
      />


      {/* Bottom Nav Bar (icons, if you want them) */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // Large Blue Header
  header: {
    backgroundColor: '#2689F2', // or a gradient if you prefer
    paddingHorizontal: 15,
    paddingTop: 50,   // space at the top
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
  // Search bar
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
  // Sort/Filter row
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
  // Grid
  gridContainer: {
    paddingBottom: 80, // space above bottom nav
    paddingHorizontal: 10,
    paddingTop: 10
  },
  tile: {
    backgroundColor: '#33E4DB', // fallback color or gradient
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
    aspectRatio: 1 // makes each tile square
  },
  tileSelected: {
    borderWidth: 2,
    borderColor: '#2689F2'
  },
  tileContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
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
  // Continue button
  continueButton: {
    backgroundColor: '#2689F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  // Bottom nav bar
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
  }
});
export default FallDetailsScreen;
