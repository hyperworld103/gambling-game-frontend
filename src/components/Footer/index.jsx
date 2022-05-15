import { Wrapper } from "./style";
import { HofButton } from "../Home/style";
import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Footer extends Component{
  render(){
    return (
      <>
        <Wrapper>
            Footer
            <Link to="/4">
              <HofButton>Hall of Fame</HofButton>
            </Link>
        </Wrapper>
      </>
    );  
  }
}
