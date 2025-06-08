// src/screens/ReportDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.date}>
          {new Date(report.createdAt).toLocaleString()}
        </Text>

        <Text style={styles.text}>{report.narrative}</Text>
      </ScrollView>
    </View>
  );
};

export default ReportDetailScreen;

const styles = StyleSheet.create({
  body: { padding: 20, paddingBottom: 100 },
  date: {
    color: '#2260FF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  text: { fontSize: 15, lineHeight: 22, color: '#252525' }
});
