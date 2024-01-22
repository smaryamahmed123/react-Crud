import React, { useState, useEffect } from "react";
 import { collection, addDoc, setDoc, doc, getDocs, updateDoc, deleteDoc, getDoc } from "firebase/firestore"; 
// import { database } from "../firebase";
import { FormControl, TextField, Button, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

const firebaseConfig = {
  apiKey: "AIzaSyArYcFTGRkgjr6aqCf2GNbJt2-F8vIBDHg",
  authDomain: "crud-5ed86.firebaseapp.com",
  databaseURL: "https://crud-5ed86-default-rtdb.firebaseio.com",
  projectId: "crud-5ed86",
  storageBucket: "crud-5ed86.appspot.com",
  messagingSenderId: "315341598922",
  appId: "1:315341598922:web:d0057acd324ed5a90e8433",
  measurementId: "G-TFFDBTZM0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// Initialize Cloud Firestore 
// Initialize Cloud Firestore and get a reference to the service
const database = getFirestore(app);

const FireStore = () => {
const [data, setdata] = useState('')
const [userData, setUserData] = useState([])
const [refresh, setRefresh] = useState(false)




useEffect(()=>{
  getData()
}, [refresh])

const getData = async ()=>{
 try {
  const arr = [];

  const docsSnap = await getDocs(collection(database, 'users'))

  docsSnap.forEach((doc)=> {
    arr.push({
      ...doc.data(),
      id : doc.id,
    })
  });

  setUserData([...arr])

 } catch (error) {
  console.log(error)
 }
}

const handelSubmit = async (e) => {
  try {
    e.preventDefault();

    const userObj = {
      data,
      isActive: true,
      userRole: 1
    };

    const docsRef = await addDoc(collection(database, 'users'), userObj);
    // console.log(docsRef, 'docsRef ');
    // setdata('');
    setRefresh(!refresh);
  } catch (error) {
    console.log(error);
  }
};
// console.log(userData, 'userData')

  const editData = async (id)=>{
   try {
    const updateValue = prompt("enter first name")
    const userObj = {
      data: updateValue,
    };
    setRefresh(!refresh)
    await updateDoc(doc(database, 'users', id),userObj)
    
   } catch (error) {
    toast.error("Data didn't Deleted Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
  }

  const deleteData = async (id)=>{
    
     try {
      await deleteDoc(doc(database, "users", id));
      setRefresh(!refresh)
      toast.success('Data Deleted Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     } catch (error) {
      toast.error("Data didn't Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }
  }
  
  const navigate = useNavigate();
  return(
   
    <form onSubmit={handelSubmit}  style={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '5px green solid',
      maxWidth: '50%',
      justifyContent: 'center'
    }}>
 
   <input
   style={{height: 30, width:'30%', marginTop:10}}
    id="standard-basic"
    placeholder="Enter your text"
    // variant="standard" 
    onChange={(e)=>setdata(e.target.value)}
    value={data} 
     />
    <Button>SUBMIT DATA</Button>

      <h1>Todo App</h1>
     {userData.map((user, index) => (
    <div>
     <li key={index}>
       {user.data}
       <IconButton onClick={() => editData(user.id)}><EditTwoToneIcon /></IconButton>
       <IconButton onClick={() => deleteData(user.id)}><DeleteOutlineTwoToneIcon/></IconButton>
     </li>
    </div>
   ))}
      <Button
          onClick={() => {
          localStorage.clear();
          
          navigate("/");
        }}
      >
        LOGOUT
      </Button>
    </form > 
  
    
    
  )
}

export {FireStore}



