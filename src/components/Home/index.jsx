import React from 'react';
import {
  BalanceBox,
  BalanceBoxTitle,
  BalanceBoxValue,  
  BoxWrapper,
  HofButton,
  CurrentRoundButton,
  CurrentRoundWrapper,
  EndsInfo,
  EndsTitle,
  EndsWrapper,
  LogoWrapper,
  RowWrapper,
  Text,
  TextArea,
  WebBanner,
  WinningBox,
  WinningBoxInfoBox,
  WinningBoxInfoBoxTitle,
  WinningBoxInfoBoxValue,
  WinningBoxTitle,
  Wrapper,
} from "./style";
import './anim.css';
import slide1 from "../../assets/players.png";
import slide2 from "../../assets/players.png";
import slide3 from "../../assets/players.png";
import slide4 from "../../assets/players.png";
import slide5 from "../../assets/players.png";
import slide6 from "../../assets/players.png";
import Logo from "./../../assets/logo.svg";
import EtheriumIcon from "./../../assets/ethereum-icon.svg";
import PlayerBox from "../PlayerBox/index";
import HistoryBox from "../HistoryBox";
import Popup from "../Popup";
import GameOverPopup from "../Popup/index-over";
import Footer from "../Footer/index";
import { PlayersBg, PlayersWrapper } from "../PlayerBox/style";
import AdminPageCmp from "../admin_page.js";
import Web3 from 'web3';
import moment from 'moment-timezone';
import Axios from 'axios';
import eventBus from "../../core/EventBus";
import  { ethers } from 'ethers';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Home extends React.Component {
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
            teamStatusIndex: 0,
            cmpStatusIndex: 0,
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
            balance:0.0
        };

        this.timer = 0;
        this.monitorTimer = 0;
        this.teamStatus = ["SIDES", "RED", "BLUE"];
        this.cmpStatus = ["ARE EQUAL", "IS WINNING", "WINNED"];
        this.resItem = [slide1, slide2, slide3, slide4, slide5, slide6];
        this.screenWidth = window.innerWidth;
        this.timeflag=true;
        this.connectMetamask = this.connectMetamask.bind(this);
        this.start = this.start.bind(this);
        this.loadRoundSettings = this.loadRoundSettings.bind(this);
        this.loadHistory = this.loadHistory.bind(this);
        this.loadAllHistory = this.loadAllHistory.bind(this);
        this.onAdminPageShow = this.onAdminPageShow.bind(this);

        this.startTimer=this.startTimer.bind(this);
        this.timerEvent=this.timerEvent.bind(this);
        this.startMonitorTimer=this.startMonitorTimer.bind(this);
        this.timerMonitorEvent=this.timerMonitorEvent.bind(this);
        this.loadWalletKey();
        this.createCollection();
        this.createAdminCollection();
        // const rinfo = JSON.parse(localStorage.getItem("rinfo"));
    }
    diffBetweenTimezone(zone1, zone2) {
        let now = moment.utc();
        let z1 = moment.tz.zone(zone1).offset(now); 
        let z2 = moment.tz.zone(zone2).offset(now);
        let ds = (z1 - z2) * 60;
        let dm = (z1 - z2);
        let dh = (z1 - z2) / 60;
        return {
            "second":ds,
            "minute":dm,
            "hour":dh
        }
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
    async componentDidMount() {
        let ts1 = await window.$myContract.methods.getFirstStartTime().call();
        let ts2 = await window.$myContract.methods.getSecondStartTime().call();
        let dt1 = moment.unix(ts1);
        let dt2 = moment.unix(ts2);
        Home.gst1 = parseInt(dt1.format('HH'));
        Home.gst2 = parseInt(dt2.format('HH'));
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
        eventBus.on("compare_amount", (data) =>
            this.evolStatus(data)
        );
        // eventBus.on("load_round_setting", () =>
        //     this.loadRoundSettings()
        // );
        eventBus.on("betted", (data) =>
            this.loadAllHistory(data.info.round)
        );
        window.ethereum.on('accountsChanged', 
                (accounts) => this.setState({publicKey: String(accounts).slice(0,6)+"..."}));

        this.loadAllHistory(this.state.curRound);
    }
    loadAllHistory(round){
        this.loadHistory(round, "Red");
        this.loadHistory(round, "Blue");
        this.setBalance();
    }
    loadHistory(round, team){
        Axios({
            method: "POST",
            url: "http://localhost:5000/api/referral/get-team-history",
            data: {
                round: round,
                team: team
            }
        }).then((res)=>{
            try{
                if(res) {
                    if(team==="Red"){
                        this.setState({red_posts: res.data});
                    }else {
                        this.setState({blue_posts: res.data});
                    }
                }
            }catch(error){
                console.log(error)
            }
        })
    }
    checkForWallet(){
        if(!window.ethereum.selectedAddress) return;
        this.setState({isSettedForWallet:true});
        this.setBalance();
    }
    evolStatus(data){
        this.setState({
            teamStatusIndex : data.data.curIndex,
            cmpStatusIndex : data.data.cmpIndex
        })
        this.setBalance();
    }
    getCurrentTimeUTC() {
        let tmLoc = new Date();
        return (tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000)/1000;
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
        let mnf = parseInt(rdata[1]);
        let mxf = parseInt(rdata[1]);
        let mnb = window.$web3.utils.fromWei(rdata[3]);
        let mxb = window.$web3.utils.fromWei(rdata[4]);
        let rt = parseInt(rdata[5]);
        let data = {
            round_number: parseInt(rid),
            jackpot:0.0,
            min_fee: mnf,
            max_fee: mxf,
            min_bet: mnb,
            max_bet: mxb,
            round_times: rt
        }        
        if(mxf==0 && mnb==0.0 && rt==0)
                alert("Rotation variable values ​​not set. please set those variables");
        this.setState({roundSettings:data});
        let jkp = parseFloat(window.$web3.utils.fromWei(rdata[0]));
        let bOwner = await this.isOwner();
        if(jkp===0.0 && bOwner) this.requestNewJackpot();
        else this.setState({...this.state, roundSettings:{...this.state.roundSettings, jackpot:jkp}});
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
        window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] }).then( async (txHash)=> {
            if (txHash) {
                await this.sleep(5000);
                let transactionReceipt = null;
                while (transactionReceipt == null) {
                    transactionReceipt = await window.$web3.eth.getTransactionReceipt(txHash);
                    await this.sleep(3000);
                }
                this.setState({...this.state, roundSettings:{...this.state.roundSettings, jackpot:0.005}});
                this.setBalance();
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
        window.ethereum.request({method: 'eth_sendTransaction', params: [txInfo]});
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
    async connectMetamask(){
        if(this.state.type === "none") return;
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then((res)=> {
                    this.setWalletKey(web3);
                });
            } catch(e) {}    
        } 
    }
    async setGameStatus(gameOver){
        let cid = await window.$myContract.methods.findOpenedId().call();
        let red = await window.$myContract.methods.getTotalBetData(cid, 0).call();
        let blue = await window.$myContract.methods.getTotalBetData(cid, 1).call();
        if(!gameOver) {
            if(red === blue) this.setState({teamStatusIndex:0, cmpStatusIndex:0});
            else if(red > blue) this.setState({teamStatusIndex:1, cmpStatusIndex:1});
            else this.setState({teamStatusIndex:2, cmpStatusIndex:1});    
        } else {
            if(red === blue) this.setState({teamStatusIndex:0, cmpStatusIndex:0});
            else if(red > blue) this.setState({teamStatusIndex:1, cmpStatusIndex:2});
            else this.setState({teamStatusIndex:2, cmpStatusIndex:2});
        }
    }
    async start() {
        await this.loadRoundSettings();
        await this.selectStartTime();
        if(Home.gst >= 0) await this.startTimer();
        else this.startMonitorTimer();
    }
    async startTimer() {
        this.setState({matching:true});
        if (this.timer === 0 && this.state.seconds > 0) {
            this.screenWidth = window.innerWidth;
            let secs = await this.getLeftSeconds();
            if(secs>0) {
                let timeLeftVar = this.secondsToTime(secs);
                this.setState({
                    timestr: this.getTimeStr(timeLeftVar),
                    curRound: 0,
                    seconds: secs
                });
                this.timer = setInterval(this.timerEvent, 1000);
            }    
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
                    gameover_alarm_open: false,
                    matching: false
                });
                let curRoundId = await window.$myContract.methods.findOpenedId().call();
                let roundLength = await window.$myContract.methods.getBetId().call();
                if(parseInt(curRoundId)+1 === roundLength){
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
    async getLeftSeconds(){
        let now = await window.$myContract.methods.getTimestamp().call();
        now = parseInt(now);
        let end = 0;
        if(Home.tn===0){
            let startTime = await window.$myContract.methods.getFirstStartTime().call();
            end = parseInt(startTime) + this.state.roundSettings.round_times * 3600;
        } else {
            let startTime = await window.$myContract.methods.getSecondStartTime().call();
            end = parseInt(startTime) + this.state.roundSettings.round_times * 3600;
        }
        let secs =  end - now;
        if(secs > 0) return secs;
        return 0;
    }
    async selectStartTime() {
        let now = await window.$myContract.methods.getTimestamp().call();
        let st1 = await window.$myContract.methods.getFirstStartTime().call();
        let st2 = await window.$myContract.methods.getSecondStartTime().call();
        st1 = parseInt(st1);
        st2 = parseInt(st2);
        now = parseInt(now);
        let end1 = st1 + this.state.roundSettings.round_times * 3600;
        let end2 = st2 + this.state.roundSettings.round_times * 3600;
        Home.gst = -1;
        if(now >= st1 && now <= end1) {Home.gst = Home.gst1; Home.tn=0;}
        if(now >= st2 && now <= end2) {Home.gst = Home.gst2; Home.tn=1;}
        await this.setGameStatus(false);
    }
    async getTimeInfo(){
        let now = await window.$myContract.methods.getTimestamp().call();
        let st1 = await window.$myContract.methods.getFirstStartTime().call();
        let st2 = await window.$myContract.methods.getSecondStartTime().call();
        st1 = parseInt(st1);
        st2 = parseInt(st2);
        now = parseInt(now);
        let minVal = Math.min(st1,st2) - now;
        let maxVal = Math.max(st1,st2) - now;
        let next = 0;
        if(minVal < 0 && maxVal < 0)
            next = 86400 - now % 86400;
        let obj = {
            "min": Math.min(st1,st2) - now,
            "max": Math.max(st1,st2) - now,
            "next": next
        };
        return obj;
    }
    async timerMonitorEvent() {
        await this.selectStartTime();
        if(Home.gst >= 0) {
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
            await this.setGameStatus(true);
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
    async onAdminPageShow() {
        let owner = await window.$myContract.methods.getOwner().call();
        owner = JSON.stringify(owner).toLowerCase();
        let wallet = JSON.stringify(window.ethereum.selectedAddress).toLowerCase();
        if(owner == wallet){
            this.setState({admin_setting_open:true});
        }
    }
    render() {
        return (
        <>
            <Wrapper>
                <Text  onClick={this.onAdminPageShow}>
                    Simple, provably fair ethereum game. No registration required.
                </Text>
                <Link to="/">
                    <LogoWrapper>
                        <img src={Logo} alt=""/>
                    </LogoWrapper>
                </Link>
                { this.state.isSettedForWallet === false ?
                    <HofButton onClick={this.connectMetamask}>Connect</HofButton>:
                    <Link to="/3">
                        <BalanceBox>
                            <BalanceBoxTitle>Your Balance:</BalanceBoxTitle>
                            <BalanceBoxValue>
                                <img src={EtheriumIcon} alt="" /> {Number(this.state.balance).toFixed(8)}
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
            <WinningBox>
                <WinningBoxTitle curIndex={this.state.teamStatusIndex}>
                <div><span>{this.teamStatus[this.state.teamStatusIndex]}</span>{this.cmpStatus[this.state.cmpStatusIndex]}</div>
                </WinningBoxTitle>
                <WinningBoxInfoBox>
                    <WinningBoxInfoBoxTitle>Current Fee:</WinningBoxInfoBoxTitle>
                    <WinningBoxInfoBoxValue>{Number(this.state.curFee).toFixed(4)}%</WinningBoxInfoBoxValue>
                </WinningBoxInfoBox>

                <WinningBoxInfoBox>
                    <WinningBoxInfoBoxTitle>This Rounds Jackpot:</WinningBoxInfoBoxTitle>
                    <WinningBoxInfoBoxValue>
                        <img src={EtheriumIcon}  alt=""/> {this.state.roundSettings.jackpot}
                    </WinningBoxInfoBoxValue>
                </WinningBoxInfoBox>
            </WinningBox>
            <BoxWrapper>
            <PlayersWrapper>
                <PlayersBg image={slide1}/>
                <PlayerBox color="blue" teamName="Blue" cardCls="blue_card" walletKey={this.state.walletKey}
                    requirement={this.state.roundSettings.min_bet} fee={this.state.curFee} round={this.state.curRound} 
                    minBet={this.state.roundSettings.min_bet} maxBet={this.state.roundSettings.max_bet} 
                    round={this.state.roundSettings.round_number}
                />
                <PlayerBox color="red" teamName="Red" cardCls="red_card" walletKey={this.state.walletKey}
                    requirement={this.state.roundSettings.min_bet} fee={this.state.curFee} round={this.state.curRound} 
                    minBet={this.state.roundSettings.min_bet} maxBet={this.state.roundSettings.max_bet}
                    round={this.state.roundSettings.round_number}
                />
            </PlayersWrapper>
            <HistoryBox color="red" teamName="Red" info={this.state.red_posts}/>
            <HistoryBox color="blue" teamName="Blue" info={this.state.blue_posts}/>
            </BoxWrapper>
            <Footer />
            <Dialog
                open = {!this.state.matching}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Popup title={this.state.popupTitle} leftTimeBeforeGame={this.state.leftTimeBeforeGame}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
                    cumque distinctio dolorem eligendi eveniet id ipsum laboriosam magnam
                    neque nobis odio officiis optio, perferendis porro quia sint ut
                    voluptatem voluptatibus?Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Assumenda cumque distinctio dolorem eligendi eveniet
                    id ipsum laboriosam magnam neque nobis odio officiis optio, perferendis
                    porro quia sint ut voluptatem voluptatibus?Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Assumenda cumque distinctio dolorem
                    eligendi eveniet id ipsum laboriosam magnam neque nobis odio officiis
                    optio, perferendis porro quia sint ut voluptatem voluptatibus?
                    game time:&nbsp;
                    {Home.gst1} ~ {(Home.gst1 + this.state.roundSettings.round_times)%24}
                     &nbsp; or {Home.gst2} ~ {(Home.gst2 + this.state.roundSettings.round_times)%24}
                </Popup>            
            </Dialog>
            <Dialog
                open = {this.state.gameover_alarm_open}
                TransitionComponent={Transition}
                keepMounted
            >
                <GameOverPopup/>
            </Dialog>
            <Dialog
                open = {this.state.admin_setting_open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth = "2000"
            >
                <AdminPageCmp/>
            </Dialog>
        </>
        );
    }
}
