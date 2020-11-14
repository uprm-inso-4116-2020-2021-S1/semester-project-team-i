import firebase from "firebase/app";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtjWt1AUM_M2o-TJcjkvxl3dyOz1_ybDs",
    authDomain: "fir-react-upload-bb40e.firebaseapp.com",
    databaseURL: "https://fir-react-upload-bb40e.firebaseio.com",
    projectId: "fir-react-upload-bb40e",
    storageBucket: "fir-react-upload-bb40e.appspot.com",
    messagingSenderId: "914108198023",
    appId: "1:914108198023:web:5bf13d9cf3f6787dc01c22",
    measurementId: "G-9NQQHXLLPF"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}
