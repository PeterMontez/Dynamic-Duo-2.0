// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV_kzhbRUpzOOY2NhpCt3uXF2jppCiFvI",
  authDomain: "toolmanager-b1304.firebaseapp.com",
  databaseURL: "https://toolmanager-b1304-default-rtdb.firebaseio.com",
  projectId: "toolmanager-b1304",
  storageBucket: "toolmanager-b1304.appspot.com",
  messagingSenderId: "263660581169",
  appId: "1:263660581169:web:8fdec971d3355d3d028010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;