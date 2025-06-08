// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ─── Existing screens ─────────────────────────────────────────
import HomeScreen from './src/screens/HomeScreen';
import FallDetailsScreen from './src/screens/FallDetailsScreen';
import ResidentConditionScreen from './src/screens/ResidentConditionScreen';
import VitalMeasurementsScreen from './src/screens/VitalMeasurementsScreen';
import AidsPresentScreen from './src/screens/AidsPresentScreen';
import InjuryAssessmentScreen from './src/screens/InjuryAssessmentScreen';
import FirstAidOfferedScreen from './src/screens/FirstAidOfferedScreen';
import FallIncidentReportScreen from './src/screens/FallIncidentReportScreen';
import PreviousReportsScreen from './src/screens/PreviousReportsScreen';
import ReportDetailScreen from './src/screens/ReportDetailScreen';
import ResidentRecordScreen from './src/screens/ResidentRecordScreen';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SetPasswordScreen from './src/screens/SetPasswordScreen'; // if you have this

// ─── The five new screens ─────────────────────────────────────────
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileEditScreen from './src/screens/ProfileEditScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import PasswordManagerScreen from './src/screens/PasswordManagerScreen';

// ─── Define all route names (TypeScript) ───────────────────────
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SetPassword: undefined;

  Home: undefined;
  FallDetails: { resident: { id: string; name: string } };
  ResidentCondition: { resident: { id: string; name: string }; placeOfFall: { id: string; label: string; icon: any } };
  VitalMeasurements: { resident: { id: string; name: string }; condition: string; placeOfFall: { id: string; label: string; icon: any } };
  AidsPresent: {
    resident: { id: string; name: string };
    condition: string;
    placeOfFall: { id: string; label: string; icon: any };
    vitals: { bloodPressure: number; bloodSugar: number; temperature: number };
  };
  InjuryAssessment: {
    resident: { id: string; name: string };
    condition: string;
    placeOfFall: { id: string; label: string; icon: any };
    vitals: { bloodPressure: number; bloodSugar: number; temperature: number };
    aidsPresent: string[];
  };
  FirstAidOffered: {
    resident: { id: string; name: string };
    condition: string;
    placeOfFall: { id: string; label: string; icon: any };
    vitals: { bloodPressure: number; bloodSugar: number; temperature: number };
    aidsPresent: string[];
    injuries: string[];
  };
  FallIncidentReport: {
    resident: { id: string; name: string };
    condition: string;
    placeOfFall: { id: string; label: string; icon: any };
    vitals: { bloodPressure: number; bloodSugar: number; temperature: number };
    aidsPresent: string[];
    injuries: string[];
    firstAid: string[];
  };
  PreviousReports: { resident: { id: string; name: string } };
  ReportDetail: { report: { id: number; residentId: string; narrative: string; createdAt: string } };
  ResidentRecord: { residentId: string };

  // ─── Five new screens ─────────────────────────────────────────
  Profile: undefined;
  ProfileEdit: { profile?: { name: string; phone: string; email: string; dateOfBirth: string; avatar: string } };
  Settings: undefined;
  NotificationSettings: undefined;
  PasswordManager: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#2689F2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        {/* ─── Auth Screens ──────────────────────────────────────── */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{ title: 'Set Password' }} />

        {/* ─── Main App Screens ──────────────────────────────────── */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Residents' }} />
        <Stack.Screen name="FallDetails" component={FallDetailsScreen} options={{ title: 'Place of Fall' }} />
        <Stack.Screen name="ResidentCondition" component={ResidentConditionScreen} options={{ title: 'Resident Condition' }} />
        <Stack.Screen name="VitalMeasurements" component={VitalMeasurementsScreen} options={{ title: 'Vital Measurements' }} />
        <Stack.Screen name="AidsPresent" component={AidsPresentScreen} options={{ title: 'Aids Present' }} />
        <Stack.Screen name="InjuryAssessment" component={InjuryAssessmentScreen} options={{ title: 'Injury Assessment' }} />
        <Stack.Screen name="FirstAidOffered" component={FirstAidOfferedScreen} options={{ title: 'First Aid Offered' }} />
        <Stack.Screen name="FallIncidentReport" component={FallIncidentReportScreen} options={{ title: 'Incident Report' }} />
        <Stack.Screen name="PreviousReports" component={PreviousReportsScreen} options={{ title: 'Past Reports' }} />
        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Report Details' }} />
        <Stack.Screen name="ResidentRecord" component={ResidentRecordScreen} options={{ title: 'Resident Record' }} />

        {/* ─── Five New Screens ──────────────────────────────────── */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordManager" component={PasswordManagerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
