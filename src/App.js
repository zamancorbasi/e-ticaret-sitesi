import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/User/user.actions';
import { connect, useSelector, useDispatch } from 'react-redux';

import './default.scss';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';

import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

function App() {
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
  
        if (userRef) {
          const unsubscribeFromSnapshot = onSnapshot(userRef, (snapshot) => {
            dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            }));
          });
  
          return () => unsubscribeFromSnapshot();
        }
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  
    // Cleanup function to unsubscribe from the auth listener on unmount
    return () => authListener();
  }, [dispatch]);


  return (
    <div className='App'>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          }
        />
        <Route
          exact
          path="/reg"
          element={
            currentUser ? (
              <Navigate to="/" />
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          exact
          path="/log"
          element={
            currentUser ? (
              <Navigate to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
