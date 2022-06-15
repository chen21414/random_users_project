import React, { Suspense, lazy } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Profilepage from "./Pages/Profilepage";

const Homepage = lazy(() => import("./Pages/Homepage")); 
const Dashboard = lazy(() => import("./Pages/Dashboard")); 


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
             <React.Suspense fallback={<>Loading...</>}>
             <Homepage />
           </React.Suspense>
          } exact />
          <Route path="/Users" element={
            <React.Suspense fallback={<>Loading...</>}>
            <Dashboard />
          </React.Suspense>
          } />
          <Route path="/profile/:id" element={<Profilepage />} />
        </Routes>
      </BrowserRouter>
     </Provider>
  );
}

export default App;
