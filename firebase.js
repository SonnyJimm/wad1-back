const firebaseConfig = {
  apiKey: "AIzaSyAABFkcC42tmd8x5HrU66EshJ6HKky7Nqo",
  authDomain: "puntsag-925de.firebaseapp.com",
  projectId: "puntsag-925de",
  storageBucket: "puntsag-925de.appspot.com",
  messagingSenderId: "705887928827",
  appId: "1:705887928827:web:19507671ef0f68b4834b5e",
  measurementId: "G-3ZNB81ETM6",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
