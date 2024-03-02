import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { onValue, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCwm6QK3BWazvxdR_l9X6wWPciNHS8q6bo",
  authDomain: "vedicxcel.firebaseapp.com",
  projectId: "vedicxcel",
  storageBucket: "vedicxcel.appspot.com",
  messagingSenderId: "1046876986205",
  appId: "1:1046876986205:web:2ecda6f4565b43c424e6b4",
  measurementId: "G-QJN39LCJ2Q",
  databaseURL:
    "https://vedicxcel-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const firebaseApp = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getDatabase(firebaseApp);

export { db };

export const fetchDataFromFirebase = (callback) => {
  const query = ref(db);

  return onValue(query, (snapshot) => {
    if (snapshot.exists()) {
      const jsonData = snapshot.val();
      callback(jsonData);
    } else {
      console.log("Data does not exist");
    }
  });
};