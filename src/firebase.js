
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,
    getAuth, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCVWCD9-Onwa71r-izAm3Emue9-vOE8CkA",
  authDomain: "netflix-clone-ee5a2.firebaseapp.com",
  projectId: "netflix-clone-ee5a2",
  storageBucket: "netflix-clone-ee5a2.firebasestorage.app",
  messagingSenderId: "17722352534",
  appId: "1:17722352534:web:d2733d07a1b0a36d4a73b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async(name, email, password)=>{
    try{
       const res =  await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    }catch(error){

        console.log(error);
        alert(error);


    }
}

const login = async(email, password)=>{
    try{
        signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout};