// src/screens/FallIncidentReportScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MAX_LENGTH = 5000;

// helper to turn IDs into human labels, e.g. 'head_injury' → 'Head Injury'
const humanize = id =>
  id.replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

const FallIncidentReportScreen = ({ route, navigation }) => {
  const {
    resident,
    placeOfFall,
    condition,
    vitals,
    aidsPresent = [],
    injuries = [],
    firstAid = []
  } = route.params;

  const [reportText, setReportText] = useState('');

  useEffect(() => {
    // simulate “Generating Report…” spinner for a moment
    setTimeout(buildReport, 500);
  }, []);

  function buildReport() {
    const parts = [];

    // 1) Found condition & place
    parts.push(
      `The patient was found ${humanize(condition).toLowerCase()} in the ${placeOfFall.label.toLowerCase()}.`
    );

    // 2) Vital measurements
    parts.push(
      `A quick body check was administered, blood pressure was measured at ` +
      `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg, ` +
      `blood sugar level at ${vitals.glucoseLevel} mg/dL, temperature at ` +
      `${vitals.temperature.toFixed(1)}°C and oxygen saturation at ` +
      `${vitals.oxygenLevel}%.`
    );

    // 3) Aids present
    if (aidsPresent.length) {
      parts.push(
        `At the time of the incident, the resident was using ` +
        `${aidsPresent.map(humanize).join(', ')} on the side.`
      );
    }

    // 4) First aid
    if (firstAid.length) {
      parts.push(
        `First aid measures were performed: ${firstAid.map(humanize).join(', ')}.`
      );
    }

    // 5) Injuries & escalation
    if (injuries.length) {
      parts.push(
        `Injuries noted: ${injuries.map(humanize).join(', ')}. ` +
        `Emergency responders were informed by telephone.`
      );
    } else {
      parts.push(`No visible injuries were found on the head or body.`);
    }

    setReportText(parts.join(' '));
  }

  // dummy “documents” array
  const documents = [
    { key: 'medPlan', label: 'Updated Medication Plan', included: true },
    { key: 'hospReport', label: 'Last Hospital Report', included: false },
    { key: 'transition', label: 'Care Transition Form', included: false },
    { key: 'will', label: 'Living Will', included: false },
    { key: 'poa', label: 'Power Of Attorney', included: false },
  ];

  return (
    <View style={styles.container}>
      {/* Blue header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fall / Incident Report</Text>
        {!reportText && <ActivityIndicator color="#fff" style={{marginTop:8}} />}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Narrative */}
        {reportText ? (
          <>
            <Text style={styles.reportText}>
              {reportText}
            </Text>
            <Text style={styles.counter}>
              {reportText.length}/{MAX_LENGTH}
            </Text>
          </>
        ) : (
          <Text style={styles.generating}>Generating Report…</Text>
        )}

        {/* Documents Included */}
        <Text style={styles.docsHeading}>Documents Included</Text>
        {documents.map(doc => (
          <View key={doc.key} style={styles.docRow}>
            <Ionicons
              name={doc.included ? 'heart' : 'heart-outline'}
              size={20}
              color={doc.included ? '#05BFD4' : '#aaa'}
            />
            <Text style={styles.docLabel}>{doc.label}</Text>
          </View>
        ))}

        {/* Print button */}
        <TouchableOpacity style={styles.printButton} onPress={() => {/* hook into your PDF/share logic */}}>
          <Ionicons name="print" size={32} color="#2689F2" />
        </TouchableOpacity>
      </ScrollView>

      {/* copy your existing bottom nav here */}
    </View>
  );
};

export default FallIncidentReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#2689F2',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center'
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  body: {
    padding: 20,
    paddingBottom: 100 /* leave room for nav */
  },
  generating: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
  reportText: { fontSize: 14, lineHeight: 20, color: '#222' },
  counter: { textAlign: 'right', marginTop: 8, color: '#666' },

  docsHeading: { marginTop: 24, fontSize: 16, fontWeight: '600', color: '#05BFD4' },
  docRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  docLabel: { marginLeft: 8, fontSize: 14, color: '#444' },

  printButton: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    backgroundColor: '#E9F6FE',
    padding: 12,
    borderRadius: 24
  }
});
