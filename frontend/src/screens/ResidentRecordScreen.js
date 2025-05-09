// src/screens/ResidentRecordScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { fetchResidentRecord } from '../services/api';

// Helper: Convert birth date (YYYY-MM-DD) into an age in years
const calculateAge = (birthDateString) => {
  if (!birthDateString) return null;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Helper: Get an extension value by URL
const getExtensionValue = (resource, url) => {
  const ext = resource.extension?.find((ext) => ext.url === url);
  if (!ext) return null;
  if (ext.valueBoolean !== undefined) return ext.valueBoolean;
  if (ext.valueString) return ext.valueString;
  if (ext.valueUrl) return ext.valueUrl;
  if (ext.valueQuantity?.value !== undefined) return ext.valueQuantity.value;
  return null;
};

const ResidentRecordScreen = ({ route }) => {
  const { residentId } = route.params;
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResident = async () => {
      try {
        const data = await fetchResidentRecord(residentId);
        setResident(data);
      } catch (error) {
        console.error('Error fetching resident:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResident();
  }, [residentId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2689F2" />
        <Text>Loading resident data...</Text>
      </View>
    );
  }

  if (!resident) {
    return (
      <View style={styles.center}>
        <Text>No resident data available.</Text>
      </View>
    );
  }

  // Extract dynamic fields
  const firstName = resident.name?.[0]?.given?.join(' ') || '';
  const lastName = resident.name?.[0]?.family || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const gender = resident.gender || 'Unknown';
  const birthDate = resident.birthDate;
  const age = calculateAge(birthDate);
  const weight = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/weight');
  const height = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/height');
  const insurer = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/insurer');
  const dnr = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/dnr') === true;
  const fallRisk = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/fallRisk');
  const vaccinations = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/vaccinations');
  const hospitalHistory = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/hospitalHistory');
  const medications = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/medications');
  const bloodType = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/bloodType');
  const photoUrl = getExtensionValue(resident, 'http://example.org/fhir/StructureDefinition/photo');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Residents Record</Text>
          <Text style={styles.headerSubtitle}>WB3</Text>
        </View>
        <View style={styles.profileContainer}>
          {photoUrl ? (
            <Image style={styles.profileImage} source={{ uri: photoUrl }} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profilePlaceholderText}>No Photo</Text>
            </View>
          )}
          <Text style={styles.residentName}>{fullName}</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{gender}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>{bloodType || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{age ? `${age} Years` : 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{weight ? `${weight} Kg` : 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{height ? `${height} cm` : 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Insurer</Text>
            <Text style={styles.infoValue}>{insurer || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Tiles Section */}
      <View style={styles.tilesContainer}>
        <View style={styles.tileRow}>
          <View style={[styles.tile, { backgroundColor: '#E43336' }]}>
            <Text style={styles.tileTitle}>DNR</Text>
            <Text style={styles.tileSubtitle}>{dnr ? 'Yes' : 'No'}</Text>
          </View>
          <View style={[styles.tile, { backgroundColor: '#4CB8FF' }]}>
            <Text style={styles.tileTitle}>Fall Risk</Text>
            <Text style={styles.tileSubtitle}>{fallRisk || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.tileRow}>
          <View style={[styles.tile, { backgroundColor: '#FFD966' }]}>
            <Text style={styles.tileTitle}>Vaccinations</Text>
            <Text style={styles.tileSubtitle}>{vaccinations || 'None'}</Text>
          </View>
          <View style={[styles.tile, { backgroundColor: '#6DD0A8' }]}>
            <Text style={styles.tileTitle}>Hospital History</Text>
            <Text style={styles.tileSubtitle}>{hospitalHistory || 'None'}</Text>
          </View>
        </View>
        <View style={styles.tileRow}>
          <View style={[styles.tile, { backgroundColor: '#33E4DB' }]}>
            <Text style={styles.tileTitle}>Medications</Text>
            <Text style={styles.tileSubtitle}>{medications || 'None'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResidentRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 30
  },
  header: {
    backgroundColor: '#2260FF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center'
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontFamily: 'League Spartan',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontFamily: 'League Spartan',
    fontSize: 16,
    fontWeight: '400',
    color: '#E9F6FE'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  profilePlaceholderText: {
    color: '#fff'
  },
  residentName: {
    fontFamily: 'League Spartan',
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  infoItem: {
    flex: 1,
    alignItems: 'center'
  },
  infoLabel: {
    fontFamily: 'League Spartan',
    fontSize: 12,
    color: '#252525'
  },
  infoValue: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    color: '#2260FF',
    marginTop: 4,
    textTransform: 'capitalize'
  },
  tilesContainer: {
    paddingHorizontal: 15,
    marginTop: 20
  },
  tileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  tile: {
    flex: 0.48,
    height: 120,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  tileTitle: {
    fontFamily: 'League Spartan',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  tileSubtitle: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
