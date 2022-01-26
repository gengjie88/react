import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {  BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// import Demo from './tools/Router';
import HomePage from './components/HomePage'
import App from './App'





// import { Route } from 'react-router';


ReactDOM.render(
  <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<App />} />
      </Routes>
    </Router>,
  document.getElementById('root'),





);
// let hostname = '/'
function setScale() {
  let designWidth = 1920;//设计稿的宽度，根据实际项目调整
  let designHeight = 1080;//设计稿的高度，根据实际项目调整
  let scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight ?
    (document.documentElement.clientWidth / designWidth) :
    (document.documentElement.clientHeight / designHeight);
  let App = document.querySelector('#screen') as HTMLElement
  App.style.transform = `scale(${scale}) translate(-50%)`;
}
window.onresize = () => {
  setScale()
}

window.onload = () => {
  console.log('fuck',window.location.pathname)
  setScale()
}
function ref(){
  let def = '/'
  let hostname = window.location.hostname
  if(def !== hostname){
    setScale()
  }
}
setInterval(()=>{
    ref()
},500)
// if(window.location.hostname !== hostname){
//   console.log('ff',hostname)
//   hostname = window.location.hostname
//   console.log(hostname)
//   setScale()
// }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
