import React, { } from 'react';
import ReactDOM from 'react-dom';
import App from './Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//pages
import About from "./pages/aboutPage.js";
import LoginSignup from "./pages/LoginSignUp.js";
import Claim from "./pages/viewClaims.js"
import AddClaim from "./pages/addClaim.js";
import EditClaim from "./pages/editClaim.js";
import AdminPage from './pages/adminPage';
import PendingClaimPage from './pages/pendingClaimPage';

const rootElement = document.getElementById('root');


ReactDOM.render(
  <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />             //to keep certain page components persistent throughout pages - nest inside App route
              <Route path="about" element={<About/>} />    //Seperate pages with new content
              <Route path="LoginSignup" element={ <LoginSignup/> } />
              <Route path='viewClaim' element={ <Claim/> } />
              <Route path='addClaim' element={ <AddClaim/> } />
              <Route path='/editClaim' element={ <EditClaim/> } />
              <Route path='/admin' element={ <AdminPage/> } />
              <Route path='/pendingClaim' element={ <PendingClaimPage/> }  />
            </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals