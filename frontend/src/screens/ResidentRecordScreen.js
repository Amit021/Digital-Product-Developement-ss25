// src/screens/ResidentRecordScreen.js   ← NEW VERSION
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { fetchResidentRecord } from '../services/api';

/** Turn ISO birthDate → age in years */
const calcAge = (iso) => {
  if (!iso) return null;
  const today = new Date();
  const dob   = new Date(iso);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
};

const ResidentRecordScreen = ({ route }) => {
  const { residentId } = route.params;
  const [resident, setResident] = useState(null);
  const [loading,  setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setResident(await fetchResidentRecord(residentId));
      } catch (e) {
        console.error('Error fetching resident', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [residentId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2689F2" />
        <Text>Loading resident data…</Text>
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

  /* ── plain fields coming from your DB ────────────────────── */
  const {
    name,
    gender,
    birthDate,
    photoUrl,
    insurer,
    dnr,
    fallRisk,
    vaccinations,
    hospitalHistory,
    medications,
    weight,
    height
  } = resident;
  const age = calcAge(birthDate);

  /* ── UI ──────────────────────────────────────────────────── */
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.body}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resident Record</Text>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.noPic]}>
            <Text style={{ color: '#fff' }}>No Photo</Text>
          </View>
        )}
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Basic facts */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.val}>{gender ?? '—'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.val}>{age ? `${age} yrs` : '—'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.val}>{weight ? `${weight} kg` : '—'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.val}>{height ? `${height} cm` : '—'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Insurer</Text>
          <Text style={styles.val}>{insurer ?? '—'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>DNR</Text>
          <Text style={styles.val}>{dnr ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      {/* Tiles */}
      <View style={styles.tiles}>
        <InfoTile title="Fall Risk"  value={fallRisk}/>
        <InfoTile title="Vaccinations" value={vaccinations}/>
        <InfoTile title="Hospital History" value={hospitalHistory}/>
        <InfoTile title="Medications" value={medications}/>
      </View>
    </ScrollView>
  );
};

/* Small helper to reuse the coloured tiles */
const InfoTile = ({ title, value }) => (
  <View style={styles.tile}>
    <Text style={styles.tileTitle}>{title}</Text>
    <Text style={styles.tileVal}>{value || 'None'}</Text>
  </View>
);

export default ResidentRecordScreen;

/* ── styles (kept minimal & close to your design) ─────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body:      { paddingBottom: 30 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: '#2260FF',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  headerTitle: { color: '#E9F6FE', fontSize: 18, marginBottom: 6 },
  avatar:      { width: 90, height: 90, borderRadius: 45, marginVertical: 10 },
  noPic:       { backgroundColor: '#999', justifyContent: 'center', alignItems: 'center' },
  name:        { color: '#fff', fontSize: 22, fontWeight: '600' },

  row:   { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  col:   { alignItems: 'center', flex: 1 },
  label: { fontSize: 12, color: '#555' },
  val:   { fontSize: 14, color: '#2260FF', marginTop: 4 },

  tiles: { paddingHorizontal: 15 },
  tile: {
    backgroundColor: '#33E4DB',
    borderRadius: 16,
    padding: 12,
    marginTop: 14
  },
  tileTitle: { color: '#fff', fontWeight: '600', marginBottom: 4, textAlign: 'center' },
  tileVal:   { color: '#fff', textAlign: 'center' }
});
