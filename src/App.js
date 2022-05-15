import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Home3 from "./components/Home/index-3";
import Home4 from "./components/Home/index-4";
import Popup from "./components/AlarmPopup";
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      open:false,
      refererKey: ""
    }
    console.log(window.$myContract);
  }
  componentDidMount() {
      this.checkChainId();
      var linkRef = window.location.pathname.slice(1);
      if(linkRef.substring(0,2)==="0x"){
        this.props.dispatch({
          type: 'PICK_REFERER',
          payload: linkRef
        })        
      }
        // store.dispatch({ type: 'PICK_REFERER', payload: linkRef  });
  }
  async checkChainId() {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId==="0x1" || chainId==="0x3" || chainId==="0x61" ||chainId==="0x2a")
        this.setState({open:false});
      else this.setState({open:true});
    }
  }
  render(){
    return (
      <div className="App">
        <Dialog
                open = {this.state.open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
        >
          <Popup>
              et  torquem  Ropsten  testnet  placet  eligere  Ethereum  mainchain
          </Popup>
        </Dialog>
          <Router>
            <Switch>
              <Route path="/3" component={Home3}>
              </Route>
              <Route path="/4" component={Home4}>
              </Route>
              <Route path="*" exact component={Home}>
              </Route>
            </Switch>
          </Router>
      </div>
    );  
  }
}
const mapStateToProps = state => {
  return {...state}
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
