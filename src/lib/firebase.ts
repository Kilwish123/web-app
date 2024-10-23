import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAPAW2nx3q539xRmSmmOef5PzCy-n8Xb1s",
  authDomain: "realtime-database-e6d54.firebaseapp.com",
  databaseURL: "https://realtime-database-e6d54-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-database-e6d54",
  storageBucket: "realtime-database-e6d54.appspot.com",
  messagingSenderId: "397378804623",
  appId: "1:397378804623:web:3f8143c2c962c5e01049fa"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);