import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './default.scss';
import { auth, handleUserProfile } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribeSnapshot();
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route 
          exact path="/" 
          element={
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          } 
        />
        <Route 
          exact path="/reg" 
          element={
            currentUser ? <Navigate to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )
          } 
        />
        <Route 
          exact path="/log" 
          element={
            currentUser ? <Navigate to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
