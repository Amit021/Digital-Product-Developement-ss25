// src/screens/PreviousReportsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { fetchReportsForResident } from '../services/api';

const PreviousReportsScreen = ({ route, navigation }) => {
  const { resident } = route.params;
  const [reports, setReports]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setReports(await fetchReportsForResident(resident.id));
      } finally {
        setLoading(false);
      }
    })();
  }, [resident.id]);

  /* loading & empty-state shortcuts */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2689F2" />
      </View>
    );
  }
  if (!reports.length) {
    return (
      <View style={styles.center}>
        <Text>No previous reports.</Text>
      </View>
    );
  }

  /* open full report on press */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReportDetail', { report: item })}
    >
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
      <Text numberOfLines={3}>{item.narrative}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reports}
        keyExtractor={(r) => String(r.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default PreviousReportsScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#E9F6FE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12
  },
  date: { color: '#2260FF', marginBottom: 6, fontWeight: '600' }
});
