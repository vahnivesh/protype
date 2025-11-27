// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ===============================
// 🔥 Your Firebase Config
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAq_87mHtnX5UbMNFfk3kqW7TpirTtalOA",
  authDomain: "chat-8784c.firebaseapp.com",
  databaseURL: "https://chat-8784c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-8784c",
  storageBucket: "chat-8784c.appspot.com",
  messagingSenderId: "128244917012",
  appId: "1:128244917012:web:49ff8725f6dcb150031801"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// ------------------------------------------------------
// 1️⃣ Upload encrypted public fingerprint
// ------------------------------------------------------
export function uploadEncryptedFingerprint(username, encryptedObj) {
  return set(ref(db, "dif/" + username), encryptedObj);
}

// ------------------------------------------------------
// 2️⃣ Instagram HASH → Check if already used
// ------------------------------------------------------
export async function isInstagramHashUsed(instaHash) {
  const snap = await get(ref(db, "verified_instagram/" + instaHash));
  return snap.exists(); // true = already linked to someone else
}

// ------------------------------------------------------
// 3️⃣ Instagram HASH → Mark as used (global)
// ------------------------------------------------------
export function markInstagramHashUsed(instaHash) {
  return set(ref(db, "verified_instagram/" + instaHash), true);
}

// ------------------------------------------------------
// 4️⃣ Link Instagram hash → this user (local identity username)
// ------------------------------------------------------
export function linkInstagramToUser(identityUsername, instaHash) {
  return set(
    ref(db, "user_links/" + identityUsername + "/instagram"),
    instaHash
  );
}

// ------------------------------------------------------
// 5️⃣ Social verified (generic) — Optional
// ------------------------------------------------------
export function markSocialVerified(username, platform) {
  return set(ref(db, `verified/${username}/${platform}`), true);
}
