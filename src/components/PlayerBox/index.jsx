import {
  Address,
  BettingSection,
  BettingSectionIcon,
  BettingSectionInput,
  BettingSectionLine,
  BettingSectionSummary,
  BettingSectionSummaryAltText,
  BettingSectionSummaryIcon,
  BettingSectionSummaryText,
  Desc,
  Flag,
  HeaderTitle,
  QRCode,
  ReceivedValue,
  Submit,
  PlayerBoxWrapper,
  PlayerBoxHeader,
  QrCodeWrapper,
  QrCodeTextWrapper,
} from "./style";
import EtheriumIcon from "../../assets/ethereum-icon.svg";
import QRCodeImage from "../../assets/qr_code.png";
import React, { Component } from 'react';
import Axios from 'axios';
import AnimatedNumber from "animated-number-react";
import eventBus from "../../core/EventBus";
import { connect } from 'react-redux';

class PlayerBox extends Component {
  static totRedAmount=0.0;
  static totGreenAmount=0.0;
  static feeAmount=0.0;
  constructor(props) {
    super(props)

    this.state = {
      totalRedAmount:0.0,
      totalGreenAmount:0.0,
      shareAmount:0.0,
      feeAmount:0.0,
      ethAmount:"",
      mainCls: this.props.PlayerBoxCls
    }
    PlayerBox.totRedAmount=this.state.totalRedAmount;
    PlayerBox.totGreenAmount=this.state.totalGreenAmount;
  }

  async loadPlayerBoxInfo(){
    let rid = await window.$myContract.methods.findOpenedId().call();
    let totRedAmount = await window.$myContract.methods.getTotalBetData(rid, 0).call();
    let totGreenAmount = await window.$myContract.methods.getTotalBetData(rid, 1).call();
    totRedAmount = window.$web3.utils.fromWei(totRedAmount);
    totGreenAmount = window.$web3.utils.fromWei(totGreenAmount);
    PlayerBox.totRedAmount = parseFloat(totRedAmount);
    PlayerBox.totGreenAmount = parseFloat(totGreenAmount);
    this.setState({
      totalRedAmount: PlayerBox.totRedAmount,
      totalGreenAmount: PlayerBox.totGreenAmount
    });

    let cmp = totRedAmount - totGreenAmount;
    let res = (cmp === 0)? 0: (cmp > 0)? 1 : 2;
    switch(res){
      case 0:
        eventBus.dispatch("compare_amount", {data:{teamIndex:0, cmpIndex:0}}); break;
      case 1:
        eventBus.dispatch("compare_amount", {data:{teamIndex:1, cmpIndex:1}}); break;
      case 2:
        eventBus.dispatch("compare_amount", {data:{teamIndex:2, cmpIndex:1}}); break;
      default:
    }
  }

  componentWillMount(){
    this.loadPlayerBoxInfo();
  }

  formatValue = (value) => Number(value).toFixed(5);

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async betToThisMatch(round, teamId){
    
    if (window.ethereum) {
      let referer = this.props.message.refererAddress;
      let data = (referer==="" || referer===null)?
            window.$myContract.methods.bet(round, teamId, "0x0000000000000000000000000000000000000000").encodeABI() :
            window.$myContract.methods.bet(round, teamId, referer).encodeABI();
      // let data = window.$myContract.methods.bet(round, teamId).encodeABI();

      let txInfo = {
          from: window.ethereum.selectedAddress,
          to: window.$bettingContractAddress,
          value: window.$web3.utils.toHex(window.$web3.utils.toWei(Number(this.state.shareAmount).toFixed(6),'ether')),
          data:data
      }
      window.ethereum.request({ method: 'eth_sendTransaction', params: [txInfo] }).then( async (txid) => {
        if (txid) {
          await this.sleep(5000);
          let transactionReceipt = null
          while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
              transactionReceipt = await window.$web3.eth.getTransactionReceipt(txid);
              await this.sleep(3000);
          }
          this.loadPlayerBoxInfo();

          let data={
            amount: this.state.ethAmount,
            fee: PlayerBox.feeAmount,
            total_red_amount: this.state.totalRedAmount,
            total_green_amount: this.state.totalGreenAmount,
            wallet_key: String(window.ethereum.selectedAddress),
            round_number: round,
            which: (teamId===0)?"Red":"Blue",
            trans_address: "https://ropsten.etherscan.io/tx/"+txid
          }
          this.addPlayerBoxData(data);
          // this.startBetNotifications();
        }
      });
    }
  }

  startBet(){
    let wkey=this.props.walletKey;
    if(wkey==="Connect"|| wkey===null){
      alert("please connect to your wallet.");
      return;
    }
    let round = parseInt(this.props.round);
    let teamId = (this.props.teamName==="Red")? 0 : 1;
    this.betToThisMatch(round, teamId);
  }

  startBetNotifications=()=>{
    if(this.props.teamName==="Red")
      this.setState({mainCls:"red_card red_anim"});
    else this.setState({mainCls:"blue_card blue_anim"});
  }

  endNotification(){
    this.setState({mainCls:this.props.cardCls});
  }

  addPlayerBoxData(rdata){
    Axios({
      method: "POST",
      url: "http://localhost:5000/api/referral/add-data",
      data: rdata
    });
    eventBus.dispatch("betted", {info:{round: rdata.round_number}});
  }

  changeEthAmount(evt) {
    let fee = parseFloat(this.props.fee);
    if(this.props.teamName==="Red") {
      PlayerBox.feeAmount=fee*1.1*PlayerBox.totRedAmount/100;
    } else {
      PlayerBox.feeAmount=fee*1.1*PlayerBox.totGreenAmount/100;
    }
    this.setState({
      ethAmount: evt.target.value,
      shareAmount: parseFloat(evt.target.value) - PlayerBox.feeAmount
    });
  }

  render(){
    console.log(this.props.message.refererAddress);
    return (
      <PlayerBoxWrapper>
        <Flag color={this.props.color} />
        <PlayerBoxHeader>
          <HeaderTitle color={this.props.color}>The {this.props.teamName} Team Received</HeaderTitle>
          <ReceivedValue>
            <img src={EtheriumIcon} alt=""/>         
            <AnimatedNumber className="mark-pan" style={{borderColor:this.props.color, transition: '3s ease-out'}}
                            value={(this.props.teamName==="Red")?this.state.totalRedAmount: this.state.totalGreenAmount}
                            formatValue={this.formatValue} />
          </ReceivedValue>
        </PlayerBoxHeader>
        <QrCodeWrapper>
          <QRCode>
            <img src={QRCodeImage} alt="qr" />
          </QRCode>
          <QrCodeTextWrapper>
            <Desc>
              If you want to invest to the {this.props.teamName} team. Send any amount of
              ethers (minimum: {this.props.minBet}) this address:
            </Desc>
            <Address>1Mon8DByNfLRhnN1M2wTs6iDhT6K7abS4k</Address>
          </QrCodeTextWrapper>
        </QrCodeWrapper>
        <BettingSection>
          <BettingSectionLine>
            <BettingSectionIcon isActive={this.state.ethAmount !== ""} />
            <BettingSectionInput
              type="text"
              name={`${this.props.color}ethers`}
              placeholder={`${this.props.minBet} - ${this.props.maxBet}`}
              value={this.state.ethAmount}
              onChange={this.changeEthAmount.bind(this)}
            />
            <Submit disabled={this.state.ethAmount === ""} 
                    onClick={ this.state.ethAmount !== ""? this.startBet.bind(this) : null }/>
          </BettingSectionLine>
          {this.state.ethAmount !== "" && (
            <BettingSectionSummary>
              <BettingSectionLine>
                <BettingSectionSummaryIcon />
                <BettingSectionSummaryText>{this.state.ethAmount}</BettingSectionSummaryText>
              </BettingSectionLine>
              <BettingSectionSummaryText>
                = {Number(this.state.shareAmount).toFixed(5)}{" "}
                <BettingSectionSummaryAltText>
                  + fee {Number(PlayerBox.feeAmount).toFixed(5)} ({Number(this.props.fee).toFixed(5)}%)
                </BettingSectionSummaryAltText>{" "}
              </BettingSectionSummaryText>
              <BettingSectionSummaryAltText>
                ={Number(this.state.shareAmount*100/parseFloat(this.state.ethAmount)).toFixed(5)} % share | status: LOSS
              </BettingSectionSummaryAltText>
            </BettingSectionSummary>
          )}
        </BettingSection>
      </PlayerBoxWrapper>
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
)(PlayerBox)