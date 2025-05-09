// src/screens/VitalMeasurementsScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const VitalMeasurementsScreen = ({ route, navigation }) => {
  const { resident, condition, placeOfFall } = route.params;

  // Separate slider states for each measurement
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [temperature, setTemperature] = useState(37);
  const [oxygenLevel, setOxygenLevel] = useState(95);
  const [glucoseLevel, setGlucoseLevel] = useState(100);

  const handleContinue = () => {
    const vitals = {
      bloodPressure: { systolic, diastolic },
      temperature,
      oxygenLevel,
      glucoseLevel,
    };
    navigation.navigate('AidsPresent', { resident, condition, placeOfFall, vitals });
  };

  return (
    <View style={styles.container}>

      {/* ScrollView that includes the header and all content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Move the header INSIDE the ScrollView */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vital Measurements</Text>
          <Text style={styles.headerSubtitle}>Enter Measurements</Text>
        </View>

        <View style={styles.formContainer}>

          <Text style={styles.label}>Systolic Blood Pressure: {systolic} mmHg</Text>
          <Slider
            style={styles.slider}
            minimumValue={90}
            maximumValue={180}
            step={1}
            value={systolic}
            onValueChange={setSystolic}
            minimumTrackTintColor="#2689F2"
            maximumTrackTintColor="#ccc"
          />

          <Text style={styles.label}>Diastolic Blood Pressure: {diastolic} mmHg</Text>
          <Slider
            style={styles.slider}
            minimumValue={60}
            maximumValue={120}
            step={1}
            value={diastolic}
            onValueChange={setDiastolic}
            minimumTrackTintColor="#2689F2"
            maximumTrackTintColor="#ccc"
          />

          <Text style={styles.label}>Temperature: {temperature.toFixed(1)} °C</Text>
          <Slider
            style={styles.slider}
            minimumValue={35}
            maximumValue={42}
            step={0.1}
            value={temperature}
            onValueChange={setTemperature}
            minimumTrackTintColor="#2689F2"
            maximumTrackTintColor="#ccc"
          />

          <Text style={styles.label}>Oxygen Level: {oxygenLevel}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={80}
            maximumValue={100}
            step={1}
            value={oxygenLevel}
            onValueChange={setOxygenLevel}
            minimumTrackTintColor="#2689F2"
            maximumTrackTintColor="#ccc"
          />

          <Text style={styles.label}>Glucose Level: {glucoseLevel} mg/dL</Text>
          <Slider
            style={styles.slider}
            minimumValue={70}
            maximumValue={180}
            step={1}
            value={glucoseLevel}
            onValueChange={setGlucoseLevel}
            minimumTrackTintColor="#2689F2"
            maximumTrackTintColor="#ccc"
          />

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Bottom navigation pinned to the bottom */}
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
    fontSize: 16, 
    textAlign: 'center'
  },
  formContainer: {
    padding: 20,
    marginTop: 20
  },
  label: {
    fontSize: 16,
    marginVertical: 8
  },
  slider: {
    width: '100%',
    height: 40
  },
  continueButton: {
    backgroundColor: '#2689F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
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

export default VitalMeasurementsScreen;
