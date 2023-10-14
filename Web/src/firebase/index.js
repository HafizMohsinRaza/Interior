import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyDBf69qXi7YgBa1ojAeNCxHqDF6XK18z2w",
  authDomain: "interiorme-3b99c.firebaseapp.com",
  databaseURL:"gs://interiorme-3b99c.appspot.com",
  projectId: "interiorme-3b99c",
  storageBucket: "interiorme-3b99c.appspot.com",
  messagingSenderId: "892973846914",
  appId: "1:892973846914:web:c76d7cc26ea164a5c77f9b",
});

// Firebase storage reference
const storage = getStorage(app);
const auth = getAuth(app)

export { storage , auth };