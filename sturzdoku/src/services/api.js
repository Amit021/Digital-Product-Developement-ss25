// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

/*──────────────── host detection ────────────────*/
function detectHost() {
  // ① When running under Metro (Expo Go / dev-client) we can read the host:
  //    e.g. "192.168.178.27:8081"  →  "192.168.178.27"
  if (__DEV__) {
    const hostFromMetro =
      Constants.manifest?.debuggerHost ||          // SDK ≤ 48
      Constants.expoConfig?.hostUri ||             // SDK 49+
      Constants.manifest2?.extra?.metroServerHost; // newer

    if (hostFromMetro) return hostFromMetro.split(':').shift();
  }

  // ② Android **emulator** (Expo Go or dev-client) — only triggers
  //    when the app really runs inside the Android VM
  if (__DEV__ && Platform.OS === 'android' && !Constants.isDevice) {
    return '10.0.2.2';
  }

  // ③ iOS simulator (localhost still works there)
  if (__DEV__ && Platform.OS === 'ios' && !Constants.isDevice) {
    return 'localhost';
  }

  // ④ Production build – put your real API domain here
  return 'YOUR-PROD-API-DOMAIN.com';
}

const HOST = detectHost();
const BASE_URL = 'http://98.81.149.174:4000';
console.log('[API] baseURL =', BASE_URL);

/*──────────────── axios instance ────────────────*/
export const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// attach bearer token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// debug all errors in one place
API.interceptors.response.use(
  res => res,
  err => {
    console.log('[API-error]', err.message, err.response?.status);
    return Promise.reject(err);
  }
);

/*──────────────── AUTH ─────────────────────────*/
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
export const fetchMyProfile  = ()      => API.get('/me').then(r => r.data);
export const updateMyProfile = body    => API.put('/me', body).then(r => r.data);
export const changePassword  = params  =>
  API.put('/me/password', params).then(r => r.data);

/*──────────────── RESIDENTS & REPORTS ──────────*/
export const fetchAllResidents        = ()                            =>
  API.get('/residents').then(r => r.data);

export const saveIncidentReport       = ({ residentId, narrative })   =>
  API.post('/incident-reports', { residentId, narrative }).then(r => r.data);

export const fetchReportsForResident  = residentId                    =>
  API.get(`/incident-reports/resident/${residentId}`).then(r => r.data);
