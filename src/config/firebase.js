import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp_T_71M8T4MdqjArP-e8aO-e8x8beD48",
  authDomain: "test-project-e555f.firebaseapp.com",
  databaseURL: "https://test-project-e555f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-project-e555f",
  storageBucket: "test-project-e555f.appspot.com",
  messagingSenderId: "886661792277",
  appId: "1:886661792277:web:2365f1b72410f1bca5041c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, set, update, onValue };
