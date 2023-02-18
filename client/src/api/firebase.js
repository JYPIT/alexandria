// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// 로그인 & 로그아웃
// navBar에 넣어서 실행하면 firebase에 의존하게되므로 여기서 직접 실행해준다.
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

// 로그인 감시자
export function loginObserver(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await checkAdmin(user) : null;
    callback(updatedUser);
  });
}

async function checkAdmin(user) {
  return get(ref(database, `admins`)).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin: isAdmin };
    }
    return user;
  });
}

//Realtime database

// 데이터 읽기
export async function getBooksFromLibrary(userId) {
  return get(ref(database, `libraries/${userId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

// 데이터 쓰기
export async function addBookToLibrary(user, book) {
  set(ref(database, `libraries/${user.uid}/${book.id}`), book);
}

export async function delBookFromLibrary(userId, book) {
  return remove(ref(database, `libraries/${userId}/${book.id}`));
}

export async function addOrUpdateToLib(userId, book) {
  return set(ref(database, `libraries/${userId}/${book.id}`), book);
}
