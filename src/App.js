import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './default.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';


function App() {
  return (
    <div className='App'>
  

    
   
    <Routes>
      <Route 
        path="/" 
        element={
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        } 
      />
      
      <Route 
        path="/reg" 
        element={
          <MainLayout>
            <Registration />
          </MainLayout>
        } 
      />
    </Routes>

      {/*
      <Routes> {/**eskiden bunun yerin switch kullanılıyomuş 
        <Route exact path='/' render={()=>(
          <MainLayout>
            <Homepage />
          </MainLayout>

        )} />
        
        <Route exact path='/reg' render={()=>(
          <MainLayout>
            <Registration />
          </MainLayout>

        )} />
      </Routes>*/}

      
   
    
    
    
    </div>
  );
}

export default App;
