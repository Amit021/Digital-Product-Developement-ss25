// ──────────────────────────────────────────────
// src/services/api.js  —  all nine exported calls
// ──────────────────────────────────────────────

import AsyncStorage from '@react-native-async-storage/async-storage';

// Where the backend is running.
// iOS simulator → localhost, Android emulator → 10.0.2.2, physical device → LAN IP.
const BACKEND_URL = 'http://localhost:4000';

// ---------------------------------------------------------------------------
// Fixed endpoints
// ---------------------------------------------------------------------------
const PROFILE_ENDPOINT  = `${BACKEND_URL}/me`;
const PASSWORD_ENDPOINT = `${BACKEND_URL}/me/password`;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
async function getAuthHeader() {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');
  return { Authorization: `Bearer ${token}` };
}

// Accepts “DD / MM / YYYY” and returns ISO yyyy‑mm‑dd
function toIsoDate(dob) {
  if (!dob || !dob.includes('/')) return dob;
  const [day, month, year] = dob.split('/').map((p) => p.trim());
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Centralised fetch so we don’t repeat error handling
async function call(url, options = {}) {
  const res  = await fetch(url, options);
  const data = await res.json().catch(async () => ({ text: await res.text() }));
  if (!res.ok) throw new Error(data.error || data.text || `HTTP ${res.status}`);
  return data;
}

// ---------------------------------------------------------------------------
// 1) SIGN‑UP  – POST /signup
// ---------------------------------------------------------------------------
export async function signUp({ email, password, fullName }) {
  const data = await call(`${BACKEND_URL}/signup`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email, password, fullName }),
  });
  await AsyncStorage.setItem('authToken', data.token);
  await AsyncStorage.setItem('userFullName', data.nurse.fullName || '');
  return data.nurse;
}

// ---------------------------------------------------------------------------
// 2) LOGIN  – POST /login
// ---------------------------------------------------------------------------
export async function login({ email, password }) {
  const data = await call(`${BACKEND_URL}/login`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email, password }),
  });
  await AsyncStorage.setItem('authToken', data.token);
  await AsyncStorage.setItem('userFullName', data.nurse.fullName || '');
  return data.nurse;
}

// ---------------------------------------------------------------------------
// 3) FETCH ALL RESIDENTS  – GET /residents  (public)
// ---------------------------------------------------------------------------
export const fetchAllResidents = () =>
  call(`${BACKEND_URL}/residents`, { headers: { 'Content-Type': 'application/json' } });

// ---------------------------------------------------------------------------
// 4) SAVE INCIDENT REPORT  – POST /incident-reports  (protected)
// ---------------------------------------------------------------------------
export const saveIncidentReport = async ({ residentId, narrative }) =>
  call(`${BACKEND_URL}/incident-reports`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    body   : JSON.stringify({ residentId, narrative }),
  });

// ---------------------------------------------------------------------------
// 5) FETCH REPORTS FOR A RESIDENT  – GET /incident-reports/resident/:id  (public)
// ---------------------------------------------------------------------------
export const fetchReportsForResident = (residentId) =>
  call(`${BACKEND_URL}/incident-reports/resident/${residentId}`, { headers: { 'Content-Type': 'application/json' } });

// ---------------------------------------------------------------------------
// 6) LOGOUT  – just clears AsyncStorage
// ---------------------------------------------------------------------------
export const logout = () =>
  AsyncStorage.multiRemove(['authToken', 'userFullName', 'nurseProfile']);

// ---------------------------------------------------------------------------
// 7) FETCH MY PROFILE  – GET /me  (protected)
// ---------------------------------------------------------------------------
export const fetchMyProfile = async () => {
  try {
    const data = await call(PROFILE_ENDPOINT, {
      headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    });
    await AsyncStorage.setItem('nurseProfile', JSON.stringify(data));
    if (data.fullName) await AsyncStorage.setItem('userFullName', data.fullName);
    return data;
  } catch (err) {
    if (['No auth token found', 'HTTP 401', 'HTTP 403'].some((m) => err.message.includes(m))) {
      await logout();
      return null;
    }
    throw err;
  }
};

// ---------------------------------------------------------------------------
// 8) UPDATE MY PROFILE  – PUT /me  (protected)
// ---------------------------------------------------------------------------
export const updateMyProfile = async (profile) =>
  call(PROFILE_ENDPOINT, {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    body   : JSON.stringify({ ...profile, dateOfBirth: toIsoDate(profile.dateOfBirth) }),
  }).then(async (updated) => {
    await AsyncStorage.setItem('nurseProfile', JSON.stringify(updated));
    if (updated.fullName) await AsyncStorage.setItem('userFullName', updated.fullName);
    return updated;
  });

// ---------------------------------------------------------------------------
// 9) CHANGE PASSWORD  – PUT /me/password  (protected)
// ---------------------------------------------------------------------------
export async function changePassword({ currentPassword, newPassword }) {
  return call(PASSWORD_ENDPOINT, {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json', ...(await getAuthHeader()) },
    body   : JSON.stringify({ currentPassword, newPassword }),
  });
}
