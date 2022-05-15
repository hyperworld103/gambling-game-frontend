import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3';
import Abi from './core/abi.json';
import { Provider } from "react-redux";
import store from "./redux/store";

window.$web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
window.$bettingContractAddress = "0x6d2FA4A0aE03fffc45aB5381422c2112f7342D8D";
window.$myContract = new window.$web3.eth.Contract(Abi, window.$bettingContractAddress);
window.$gasLimitHex = window.$web3.utils.toHex(400000);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
