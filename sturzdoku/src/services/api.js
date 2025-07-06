// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

/*──────────────── host detection (Metro / dev) ────────────────*/
function detectHost() {
  // ① Expo Go / dev-client running through Metro
  if (__DEV__) {
    const hostFromMetro =
      Constants.manifest?.debuggerHost ||          // SDK ≤ 48
      Constants.expoConfig?.hostUri ||             // SDK 49+
      Constants.manifest2?.extra?.metroServerHost; // newer

    if (hostFromMetro) return hostFromMetro.split(':').shift();
  }

  // ② Android emulator in dev mode
  if (__DEV__ && Platform.OS === 'android' && !Constants.isDevice) {
    return '10.0.2.2';
  }

  // ③ iOS simulator in dev mode
  if (__DEV__ && Platform.OS === 'ios' && !Constants.isDevice) {
    return 'localhost';
  }

  // ④ Fallback
  return 'localhost';
}

/*──────────────── base URL resolution ────────────*/
const PROD_BASE = process.env.EXPO_PUBLIC_API_BASE_URL?.trim(); // injected at build/run time
const DEV_HOST  = detectHost();

const BASE_URL =
  __DEV__
    ? `http://${DEV_HOST}:4000`                // Metro/dev scenario
    : PROD_BASE || 'https://your-backend.example.com'; // real builds

console.log('[API] baseURL =', BASE_URL);

/*──────────────── axios instance ────────────────*/
export const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('[API-error]', err.message, err.response?.status);
    return Promise.reject(err);
  }
);

/*──────────────── AUTH ──────────────────────────*/
export async function signUp({ email, password, fullName }) {
  const { data } = await API.post('/signup', { email, password, fullName });
  await AsyncStorage.setItem('authToken', data.token);
  await AsyncStorage.setItem('userFullName', data.nurse.fullName || '');
  return data.nurse;
}

export async function login({ email, password }) {
  const { data } = await API.post('/login', { email, password });
  await AsyncStorage.setItem('authToken', data.token);
  await AsyncStorage.setItem('userFullName', data.nurse.fullName || '');
  return data.nurse;
}

export async function logout() {
  await AsyncStorage.multiRemove(['authToken', 'userFullName', 'nurseProfile']);
}

/*──────────────── NURSE PROFILE ────────────────*/
export const fetchMyProfile  = ()       => API.get('/me').then(r => r.data);
export const updateMyProfile = (body)   => API.put('/me', body).then(r => r.data);
export const changePassword  = (params) => API.put('/me/password', params).then(r => r.data);

/*──────────────── RESIDENTS & REPORTS ──────────*/
export const fetchAllResidents       = ()                           =>
  API.get('/residents').then(r => r.data);

export const saveIncidentReport      = ({ residentId, narrative })  =>
  API.post('/incident-reports', { residentId, narrative }).then(r => r.data);

export const fetchReportsForResident = (residentId)                 =>
  API.get(`/incident-reports/resident/${residentId}`).then(r => r.data);
