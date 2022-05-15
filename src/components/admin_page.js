import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import  { ethers } from 'ethers';

const StyledTableCell = withStyles((theme) => ({
    head: {
      fontFamily: "TypoRoundBold",
      color: theme.palette.common.white,
      border: 'none',
      textAlign: "center",
      fontSize: 14
    },
    body: {
      fontFamily: "TypoRoundBold",
      fontSize: 14,
      color: "#8f8391",
      textAlign: "center",
      borderBottom: '1px solid #5e2764'
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: "#121c3e",
    },
}))(TableRow);

function createData(idnum, round_times, jackpot, min_fee, max_fee, min_bet, max_bet, checked) {
    return { idnum, round_times, jackpot, min_fee, max_fee, min_bet, max_bet, checked};
}

let rows = [];

const profitStyle = {
    color: "#6cda22"
}
  
class AdminPageCmp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resDays: 1
        };
        this.loadReserveTable = this.loadReserveTable.bind(this);
        this.loadReserveTable();
    }
    async requestJackpot(evt, idx){
        if(!window.ethereum || !window.ethereum.selectedAddress){
            alert("ethereum or wallet address error");return;
        }
        let rid = await window.$myContract.methods.findOpenedId().call();
        let data = await window.$myContract.methods.setJackpot(rid, ethers.utils.parseUnits(rows[idx-1].jackpot.toString())).encodeABI();
        var txdetail = {
            from: window.ethereum.selectedAddress,
            to: window.$bettingContractAddress,
            value: window.$web3.utils.toHex(window.$web3.utils.toWei(rows[idx-1].jackpot.toString())),
            data:data
        }
        window.ethereum.request({ method: 'eth_sendTransaction', params: [txdetail] }).then( async (res) => {
            if(res) {
                evt.target.offsetParent.style="font-size:10px;background-color:gray";
                this.saveReserveTable();
            }
        });
    }
    async requestNewRound(evt, idx){
        if(!window.ethereum || !window.ethereum.selectedAddress){
            alert("ethereum or wallet address error");return;
        }
        let web3 = window.$web3;        
        let data = window.$myContract.methods.addBet(rows[idx-1].round_times,rows[idx-1].min_fee, rows[idx-1].max_fee, 
                                            ethers.utils.parseUnits(rows[idx-1].min_bet.toString()), 
                                            ethers.utils.parseUnits(rows[idx-1].max_bet.toString())).encodeABI();
        var txdetail = {
            from: window.ethereum.selectedAddress,
            to: window.$bettingContractAddress,
            value: web3.utils.toHex(web3.utils.toWei("0")),
            data:data
        }
        window.ethereum.request({ method: 'eth_sendTransaction', params: [txdetail] }).then( async (res) => {
            if(res) {
                evt.target.offsetParent.style="font-size:10px;background-color:gray";
                this.saveReserveTable();
            }
        });
    }
    changeReserveEdit(evt){
        this.setState({resDays:evt.target.value});
    }
    createReserveTable(){
        if(this.state.resDays<=0 || this.state.resDays>30){
            alert("please input correct information!"); return;
        }
        rows=[];
        for(let i=0;i<this.state.resDays;i++)
            rows.push(createData(i+1, 8, 0.005, 1, 50, 0.001, 10, false));
    }
    loadReserveTable(){
    }
    saveReserveTable(){
    }
    handleTime=(e,v)=>{
        rows[v-1].round_times = e.target.value;
    }
    handleJackPot=(e,v)=>{
        rows[v-1].jackpot = e.target.value;
    }
    handleMinFee=(e,v)=>{
        rows[v-1].min_fee = e.target.value;
    }
    handleMaxFee=(e,v)=>{
        rows[v-1].max_fee = e.target.value;
    }
    handleMinBet=(e,v)=>{
        rows[v-1].min_bet = e.target.value;
    }
    handleMaxBet=(e,v)=>{
        rows[v-1].max_bet = e.target.value;
    }
    render () {
        return (
            <div style={{backgroundColor:"#0c132c", width:"800px", height:"600px"}}>
                <Grid container className = "text-center admin_bg" style={{backgroundColor:"#0c132c", padding:"1%"}}>
                    <Grid item xs = {12} sm = {12} md = {4}>
                        <div style={{color:"white"}}>How many would you like to reserve?</div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {1}></Grid>
                    <Grid item xs = {12} sm = {12} md = {1}>
                        <input type="text" className="unlimitedText" placeholder="1 ~ 30 days" value={this.state.resDays} onChange={this.changeReserveEdit.bind(this)}/>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {2}></Grid>
                    <Grid item xs = {12} sm = {12} md = {1}>
                        <Button variant="contained" color="primary" onClick={this.createReserveTable.bind(this)}> Create </Button>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {1}></Grid>
                    <Grid item xs = {12} sm = {12} md = {1}>
                        <Button variant="contained" color="primary" onClick={this.saveReserveTable.bind(this)}> Save </Button>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {1}></Grid>
                    <Grid item xs = {12} sm = {12} md = {1}>
                        <Button variant="contained" color="primary" onClick={this.saveReserveTable.bind(this)}> Save </Button>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {12} style={{marginTop:"5px"}}>
                        <TableContainer component={Paper} style={{backgroundColor:"brown"}}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow className="tableRow">
                                        <StyledTableCell align="center">id</StyledTableCell>
                                        <StyledTableCell align="center">round times</StyledTableCell>
                                        <StyledTableCell align="center">jackpot</StyledTableCell>
                                        <StyledTableCell align="center">min fee(%)</StyledTableCell>
                                        <StyledTableCell align="center">max fee(%)</StyledTableCell>
                                        <StyledTableCell align="center">min bet(%)</StyledTableCell>
                                        <StyledTableCell align="center">max bet(%)</StyledTableCell>
                                        <StyledTableCell align="center">checked</StyledTableCell>
                                        <StyledTableCell align="center">run1</StyledTableCell>
                                        <StyledTableCell align="center">run2</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                    <StyledTableRow key={row.id} className = "x-tableCell">
                                        <StyledTableCell component="th" scope="row" align="center">{row.idnum}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            <input type="text" className="unlimitedText" defaultValue={row.round_times} onChange = {(e)=>this.handleTime(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            <input type="text" className="unlimitedText" defaultValue={row.jackpot} onChange = {(e)=>this.handleJackPot(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <input type="text" className="unlimitedText" defaultValue={row.min_fee} onChange = {(e)=>this.handleMinFee(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" style={profitStyle}>
                                            <input type="text" className="unlimitedText" defaultValue={row.max_fee} onChange = {(e)=>this.handleMaxFee(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <input type="text" className="unlimitedText" defaultValue={row.min_bet} onChange = {(e)=>this.handleMinBet(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" style={profitStyle}>
                                            <input type="text" className="unlimitedText" defaultValue={row.max_bet} onChange = {(e)=>this.handleMaxBet(e,row.idnum)}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" style={profitStyle}> {row.checked?"true":"false"} </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained" color="primary" style={{fontSize:"10px"}} onClick = {(e)=>this.requestNewRound(e, row.idnum)}>Add settings</Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained" color="primary" style={{fontSize:"10px"}} onClick = {(e)=>this.requestJackpot(e, row.idnum)}>Add jackpot</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default AdminPageCmp;
