import React from "react";
import { FireStore } from "./Components/TodoList";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import {LogIn} from "./Pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from "./Routes/AuthRoutes";
import ProtectedRoute from "./Routes/ProtectedRoutes";
function App() {
  return (
    <>
    <Routes>
      <Route element={<AuthRoute/>}>
      <Route index element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/todo" element={<FireStore />} />
      </Route>

      
    </Routes>
      {/* <FireStore></FireStore> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
       />
      <ToastContainer />
    </>
  );
}

export default App;

// src/App.js



