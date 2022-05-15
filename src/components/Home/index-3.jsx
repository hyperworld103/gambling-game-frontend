import {
  BalanceBox,
  BalanceBoxTitle,
  BalanceBoxValue,
  Banner,
  HofButton,
  CurrentRoundButton,
  CurrentRoundWrapper,
  EndsInfo,
  EndsTitle,
  EndsWrapper,
  Line,
  LogoWrapper,
  PersonalInfoKey,
  PersonalInfoLink,
  PersonalInfoTitle,
  PersonalInfoValue,
  PersonalInfoWrapper,
  RowWrapper,
  Text,
  TextArea,
  Wrapper,
} from "./style";
import React from 'react';
import Logo from "./../../assets/logo.svg";
import EtheriumIcon from "./../../assets/ethereum-icon.svg";
import Banner_300x250 from "../../assets/banner_300x250.png";
import TableBoxExperience from "../TableBox";
import Footer from "../Footer/index";
import TableBoxReferral from "../TableBox/index-referral";
import slide1 from "../../assets/players.png";
import slide2 from "../../assets/players.png";
import slide3 from "../../assets/players.png";
import slide4 from "../../assets/players.png";
import slide5 from "../../assets/players.png";
import slide6 from "../../assets/players.png";
import Web3 from 'web3';
import moment from 'moment-timezone';
import Axios from 'axios';
import eventBus from "../../core/EventBus";
import  { ethers } from 'ethers';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


class Home3 extends React.Component {
  static gst1;
  static gst2;
  static tn;
  static gst;
  constructor(props) {
      super(props);

      this.state = {
          roundSettings:{
              round_number: 0,
              jackpot: 0.0,
              min_fee: 1,
              max_fee: 50,
              min_bet: 0.001,
              max_bet: 10,
              round_times: 8
          },
          timestr: "00:00:00", 
          curRound: 0,
          curFee: 0,
          curStatusIndex: 0,
          publicKey: "Connect",
          walletKey:"",
          startBeforeCounter:60,
          matching:true,
          admin_setting_open:false,
          gameover_alarm_open:false,
          seconds: 28800,            
          diffValue: 0.0,
          payValue: 0.0,
          displayRedNote: "none",
          displayGreenNote: "none",
          blue_posts:{},
          red_posts:{},
          leftTimeBeforeGame:"",
          popupTitle:"",
          isSettedForWallet: false,
          balance:0.0,
          expData:[],
          refData:[]
      };

      this.timer = 0;
      this.monitorTimer = 0;
      this.resItem = [slide1, slide2, slide3, slide4, slide5, slide6];
      this.screenWidth = window.innerWidth;
      this.timeflag=true;
      this.connectMetamask = this.connectMetamask.bind(this);
      this.start = this.start.bind(this);
      this.loadRoundSettings = this.loadRoundSettings.bind(this);

      this.startTimer=this.startTimer.bind(this);
      this.timerEvent=this.timerEvent.bind(this);
      this.startMonitorTimer=this.startMonitorTimer.bind(this);
      this.timerMonitorEvent=this.timerMonitorEvent.bind(this);
      this.loadWalletKey();
      this.createCollection();
      this.createAdminCollection();
      // const rinfo = JSON.parse(localStorage.getItem("rinfo"));
  }

  convertToDate(timestamp) {
    return moment.tz(timestamp, 'X', moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
  }
  createAdminCollection() {
      Axios({
          method: "POST",
          url: "http://localhost:5000/api/referral/create-admin-collection"
      });
  }
  createCollection() {
      Axios({
          method: "POST",
          url: "http://localhost:5000/api/referral/create-collection",
          data:{
              amount: 0,
              fee: 0,
              total_red_amount: 0,
              total_green_amount: 0,
              wallet_key: "",
              round_number: 0,
              which: "",
              trans_address: ""
          }
      });
  }
  loadWalletKey() {
      let wkey = localStorage.getItem("walletKey");
      if(wkey===null || wkey.length===0) return;
      this.setState({
          walletKey: wkey
      });
  }
  secondsToTime(secs) {
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
      };
      return obj;
  }
  async loadCryptoExperiences() {
    let accounts = await window.ethereum.request({ method: 'eth_accounts' });
    let expData = await window.$myContract.methods.getCryptoExperiences(accounts[0]).call();
    if(expData==="" || expData===null)return;
    let row = expData.split("@");
    let data = [];
    for(let i=0; i<row.length; i++){
        let col = row[i].split("#");
        let expRecord = {
            "round": col[0],
            "onGoing": col[1],
            "redTotBet":  window.$web3.utils.fromWei(col[2]),
            "blueTotBet":  window.$web3.utils.fromWei(col[3]),
            "revenue": window.$web3.utils.fromWei(col[4]),
            "profit": window.$web3.utils.fromWei(col[5])
        }
        data.push(expRecord);
    }
    this.setState({expData:data});
  }  
  async componentDidMount() {
      await this.loadCryptoExperiences();
      let ts1 = await window.$myContract.methods.getFirstStartTime().call();
      let ts2 = await window.$myContract.methods.getSecondStartTime().call();
      let dt1 = moment.unix(ts1);
      let dt2 = moment.unix(ts2);
      Home3.gst1 = parseInt(dt1.format('HH'));
      Home3.gst2 = parseInt(dt2.format('HH'));
      this.checkForWallet();
      this.start();
      let web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts)=>{
          if (err != null) console.log("An error occurred");
          else if (accounts.length === 0) console.log("User is not logged in to MetaMask");
          else {
              this.setWalletKey(web3);
              this.setRoundID();
          }
      });
      window.ethereum.on('accountsChanged', 
              (accounts) => this.setState({publicKey: String(accounts).slice(0,6)+"..."}));  
  }
  checkForWallet(){
      if(!window.ethereum.selectedAddress) return;
      this.setState({isSettedForWallet:true});
      this.setBalance();
  }
  getCurrentTimeUTC() {
      let tmLoc = new Date();
      return (tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000)/1000;
  }
  async getLeftSeconds(){
      let now = await window.$myContract.methods.getTimestamp().call();
      now = parseInt(now);
      let end = 0;
      if(Home3.tn===0){
          let startTime = await window.$myContract.methods.getFirstStartTime().call();
          end = parseInt(startTime) + this.state.roundSettings.round_times * 3600;
      }else{
          let startTime = await window.$myContract.methods.getSecondStartTime().call();
          end = parseInt(startTime) + this.state.roundSettings.round_times * 3600;
      }
      let secs =  end - now;
      if(secs > 0) return secs;
      return 0;
  }
  async isOwner(){
      let owner = await window.$myContract.methods.getOwner().call();
      let curWallet = window.ethereum.selectedAddress;
      if(String(curWallet).toLowerCase()===String(owner).toLowerCase()) return true;
      return false;
  }
  async loadRoundSettings() {
      let rid = await window.$myContract.methods.findOpenedId().call();
      let stData = await window.$myContract.methods.getGeneralInfo(parseInt(rid)).call();
      let rdata = stData.split("#");
      let data = {
          round_number: parseInt(rid),
          jackpot:0.0,
          min_fee: parseInt(rdata[1]),
          max_fee: parseInt(rdata[2]),
          min_bet: window.$web3.utils.fromWei(rdata[3]),
          max_bet: window.$web3.utils.fromWei(rdata[4]),
          round_times: parseInt(rdata[5])
      }
      this.setState({roundSettings:data});
      let jkp = parseFloat(window.$web3.utils.fromWei(rdata[0]));
      let bOwner = await this.isOwner();
      if(jkp===0.0 && bOwner) this.requestNewJackpot();
      else this.setState({...this.state, roundSettings:{...this.state.roundSettings, jackpot:jkp}});

      this.screenWidth = window.innerWidth;
      let secs = await this.getLeftSeconds();
      if(secs>=0) {
          let timeLeftVar = this.secondsToTime(secs);
          this.setState({ 
              timestr: this.getTimeStr(timeLeftVar),
              curRound: 0,
              seconds: secs
          });
      }
      this.timer = setInterval(this.timerEvent, 1000);            
  }
  componentWillUnmount() {
      eventBus.remove("compare_amount");
      eventBus.remove("betted");
  }
  sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async requestNewJackpot() {
      if(!window.ethereum || !window.ethereum.selectedAddress){
          alert("ethereum or wallet address error");return;
      }
      let rid = await window.$myContract.methods.findOpenedId().call();
      let data = await window.$myContract.methods.setJackpot(parseInt(rid), window.$web3.utils.toWei("0.005")).encodeABI();
      let txInfo = {
          from: window.ethereum.selectedAddress,
          to: window.$bettingContractAddress,
          value: window.$web3.utils.toHex(window.$web3.utils.toWei("0.005")),
          data:data
      }
      window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] }).then( async (txHash) => {
          if (txHash) {
              await this.sleep(5000);
              let transactionReceipt = null;
              while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                  transactionReceipt = await window.$web3.eth.getTransactionReceipt(txHash);
                  await this.sleep(3000);
              }        
              this.setState({...this.state, roundSettings:{...this.state.roundSettings, jackpot:0.005}});
          }
      });
  }
  async requestNewRound(){
      if(!window.ethereum || !window.ethereum.selectedAddress){
          alert("ethereum or wallet address error");return;
      }
      let status = this.state.roundSettings;
      let data = window.$myContract.methods.addBet(status.round_times,status.min_fee, status.max_fee, 
                                          ethers.utils.parseUnits(status.min_bet.toString()), 
                                          ethers.utils.parseUnits(status.max_bet.toString())).encodeABI();
      let txInfo = {
          from: window.ethereum.selectedAddress,
          to: window.$bettingContractAddress,
          value: window.$web3.utils.toHex(window.$web3.utils.toWei("0")),
          data:data
      }
      window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] }).then( async (txHash) => {
      });
  }
  async setRoundID() {
      let rid = await window.$myContract.methods.findOpenedId().call();
      this.setState({...this.state, roundSettings:{...this.state.roundSettings, round_number:parseInt(rid)}});
  }
  setWalletKey(web3) {
      let returnStr = web3.currentProvider.selectedAddress;
      let temp_public_key = returnStr;
      let key_short = temp_public_key.slice(0, 6);
      this.setState({
          publicKey: key_short+"...", 
          walletKey:returnStr,
          isSettedForWallet:true
      });
      localStorage.setItem("walletKey",returnStr);
      this.setBalance();
  }
  walletKey() {
      if(!window.ethereum)return null;
      let web3 = new Web3(window.ethereum);
      return web3.currentProvider.selectedAddress;
  }
  async checkAdmin() {
      if (window.ethereum) {
          let data = await window.$myContract.methods.getOwner().call();
          data = String(data).toLowerCase();
          let walletAddr = String(this.walletKey()).toLowerCase();
          if(walletAddr.length===0) return;
          if(data === walletAddr){
              this.setState({
                  admin_setting_open: true
              });
          }
      }
  }
  async connectMetamask(){
      if(this.state.type === "none") return;
      if (window.ethereum) {
          let web3 = new Web3(window.ethereum);
          try {
              window.ethereum.enable().then((res)=> {
                  this.setWalletKey(web3);
                  this.checkAdmin();
              });
          } catch(e) {}    
      } 
  }
  start() {
      this.selectStartTime();
      if(Home3.gst >= 0) this.startTimer();
      else this.startMonitorTimer();
  }
  startTimer() {
      this.setState({matching:true});
      if (this.timer === 0 && this.state.seconds > 0) {
          this.loadRoundSettings();
      }
  }
  startMonitorTimer() {
      this.setState({matching:false}); //modify
      if (this.monitorTimer===0){
          this.monitorTimer = setInterval(this.timerMonitorEvent, 1000);
      }
  }
  getTimeStr(time) {
      return `${time.h}h ${time.m}m ${time.s}s`;
  }
  async waitForConfirmTx(txHash){
      await this.sleep(5000);
      let transactionReceipt = null
      while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
          transactionReceipt = await window.$web3.eth.getTransactionReceipt(txHash);
          await this.sleep(3000);
      }
  }
  async processPayment() {
      let data = await window.$myContract.methods.payout(this.state.roundSettings.round_number).encodeABI();
      let txInfo = {
          from: window.ethereum.selectedAddress,
          to: window.$bettingContractAddress,
          value: window.$web3.utils.toHex(window.$web3.utils.toWei("0")),
          data: data
      }
      window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] }).then( async (res) => {
          if(res){
              await this.waitForConfirmTx();
              this.setState({
                  gameover_alarm_open:false,
                  matching:false
              });
              let curRoundId = await window.$myContract.methods.findOpenedId().call();
              let roundLength = await window.$myContract.methods.getBetId().call();
              if(parseInt(curRoundId)+1==roundLength){
                  let newRoundInfo = await window.$myContract.methods.addBet(8,1,50,1000000000000000,10000000000000000000).encodeABI();
                  let txInfo = {
                      from: window.ethereum.selectedAddress,
                      to: window.$bettingContractAddress,
                      value: window.$web3.utils.toHex(window.$web3.utils.toWei("0")),
                      data:newRoundInfo
                  }
                  window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] });            
              }
          }
      });
  }
  async selectStartTime() {
      let blockTimeStamp = await window.$myContract.methods.getTimestamp().call();
      let st1 = await window.$myContract.methods.getFirstStartTime().call();
      let st2 = await window.$myContract.methods.getSecondStartTime().call();
      st1 = parseInt(st1);
      st2 = parseInt(st2);
      blockTimeStamp = parseInt(blockTimeStamp);
      let end1 = st1 + this.state.roundSettings.round_times * 3600;
      let end2 = st2 + this.state.roundSettings.round_times * 3600;
      Home3.gst = -1;
      if(blockTimeStamp >= st1 && blockTimeStamp <= end1) {Home3.gst = Home3.gst1; Home3.tn=0;}
      if(blockTimeStamp >= st2 && blockTimeStamp <= end2) {Home3.gst = Home3.gst2; Home3.tn=1;}
  }
  async getTimeInfo(){
      let blockTimeStamp = await window.$myContract.methods.getTimestamp().call();
      let st1 = await window.$myContract.methods.getFirstStartTime().call();
      let st2 = await window.$myContract.methods.getSecondStartTime().call();
      st1 = parseInt(st1);
      st2 = parseInt(st2);
      blockTimeStamp = parseInt(blockTimeStamp);
      let minVal = Math.min(st1,st2) - blockTimeStamp;
      let maxVal = Math.max(st1,st2) - blockTimeStamp;
      let next = 0;
      if(minVal < 0 && maxVal < 0)
          next = 86400 - blockTimeStamp % 86400;
      let obj = {
          "min": Math.min(st1,st2) - blockTimeStamp,
          "max": Math.max(st1,st2) - blockTimeStamp,
          "next": next
      };
      return obj;
  }
  async timerMonitorEvent() {
      this.selectStartTime();
      if(Home3.gst >= 0){
          clearInterval(this.monitorTimer);
          this.monitorTimer = 0;
          setTimeout(() => {
              this.startTimer();
          }, 1000);
      } else {
          let info = await this.getTimeInfo();
          if(info.min > 0)
              this.setState({
                  popupTitle:"Left Time",
                  leftTimeBeforeGame: this.getTimeStr(this.secondsToTime(info.min))
              });
          else if(info.max > 0)
              this.setState({
                  popupTitle:"Left Time",
                  leftTimeBeforeGame: this.getTimeStr(this.secondsToTime(info.max))
              });
          else this.setState({
              popupTitle:"Next Time",
              leftTimeBeforeGame: this.getTimeStr(this.secondsToTime(info.next))
          });
      }
  }
  async timerEvent() {
      let seconds = await this.getLeftSeconds();
      let totTime = this.state.roundSettings.round_times * 3600;
      let maxFee = this.state.roundSettings.max_fee;
      this.setState({
          timestr: this.getTimeStr(this.secondsToTime(parseInt(seconds))),
          seconds: seconds,
          curFee: (maxFee-1)*(totTime-seconds+totTime/maxFee)/totTime
      });
      localStorage.setItem("current_fee", this.state.curFee);
      localStorage.setItem("past_second", this.state.seconds);
      localStorage.setItem("current_round", this.state.curRound);
      localStorage.setItem("status", 1);
      // seconds = 0;
      if (seconds === 0) {
          clearInterval(this.timer);
          this.timer = 0;
          let bOwner = await this.isOwner();
          let balance = await window.$myContract.methods.getBalance().call();
          if(bOwner && balance>0) await this.processPayment();
      }
  }
  async setBalance(){
      let bal = await window.$myContract.methods.getBalance().call();
      this.setState({balance: window.$web3.utils.fromWei(bal)});
  }
  async onReferalEarning(round){
    let reData = await window.$myContract.methods.getReferalEarnings(round).call();
    reData = String(reData).trim();
    console.log("re data:", reData);
    if(reData.length == 0 || reData == "") {
        alert("There are no referers for this round.");
        return;
    }
    let row = reData.split("@");
    let data = [];
    for(let i=0; i<row.length; i++){
        let col = row[i].split("#");
        let record = {
            "referer": col[0],
            "amount":  window.$web3.utils.fromWei(col[1])
        }
        data.push(record);
    }
    this.setState({refData:data});
  }
  render(){
    return (
      <>
        <Wrapper>
          <Text>
            Simple, provably fair ethereum game. No registration required.
          </Text>
          <Link to="/">
            <LogoWrapper>
                <img src={Logo} alt="" />
            </LogoWrapper>
          </Link>
          { this.state.isSettedForWallet === false ?
              <HofButton onClick={this.connectMetamask}>Connect</HofButton>:
              <Link to="/3">       
                <BalanceBox >
                    <BalanceBoxTitle>Your Balance:</BalanceBoxTitle>
                    <BalanceBoxValue>
                        <img src={EtheriumIcon} alt="" /> {this.state.balance}
                    </BalanceBoxValue>
                </BalanceBox>
              </Link>
          }
        </Wrapper>
        <RowWrapper>
          <TextArea>
            The law of the nature is simple. The big team (the one with more
            ethers) eats the small one and all its ethers plus the jackpot. At the
            end of the round these ethers are shared by all players who invested
            into the big team.
          </TextArea>
          <CurrentRoundWrapper>
            <CurrentRoundButton>
              Current Round: <span>{this.state.roundSettings.round_number+1}</span>
            </CurrentRoundButton>
            <EndsWrapper>
              <EndsTitle>This Rounds Ends In:</EndsTitle>
              <EndsInfo>{this.state.timestr}</EndsInfo>
            </EndsWrapper>
          </CurrentRoundWrapper>
        </RowWrapper>
        <Line>
          <PersonalInfoWrapper>
            <PersonalInfoTitle>Personal Info</PersonalInfoTitle>
            <PersonalInfoKey>your balance</PersonalInfoKey>
            <PersonalInfoValue>{this.state.balance}</PersonalInfoValue>
            <PersonalInfoKey>referal code.</PersonalInfoKey>
            <PersonalInfoValue>
              <img src={EtheriumIcon} alt="" /> {this.props.message.refererAddress}
            </PersonalInfoValue>
            <PersonalInfoLink href="http://wwww.google.com">
              www.google.com
            </PersonalInfoLink>
          </PersonalInfoWrapper>
          <Banner>
            <img src={Banner_300x250} alt="banner_300x250" />
          </Banner>
          <TableBoxExperience title="Your Cryptow Experience" expData = {this.state.expData} referal={this}/>
          <Banner>
            <img src={Banner_300x250} alt="banner_300x250" />
          </Banner>
          <TableBoxReferral title="Referal Earrings" data = {this.state.refData}/>
        </Line>
        <Footer />
      </>
    );

  }
}
const mapStateToProps = state => {
    return { message: state.posts }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home3)
