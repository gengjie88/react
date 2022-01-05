import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageHome from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <PageHome/>
  </React.StrictMode>,
  document.getElementById('root'),





);
function setScale(){
  let designWidth = 1920;//设计稿的宽度，根据实际项目调整
  let designHeight = 1080;//设计稿的高度，根据实际项目调整
  let scale = document.documentElement.clientWidth/document.documentElement.clientHeight < designWidth/designHeight ? 
       (document.documentElement.clientWidth / designWidth):
       (document.documentElement.clientHeight / designHeight);
let App = document.querySelector('#screen') as HTMLElement
App.style.transform = `scale(${scale}) translate(-50%)`;
}
window.onresize = ()=>{
  setScale()
}



window.onload=()=>{
  setScale()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
