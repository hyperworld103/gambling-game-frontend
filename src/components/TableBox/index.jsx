import { ExperienceTable, InnerList, List, TableWrapper, Title } from "./style";
import EtheriumIcon from "./../../assets/ethereum-icon.svg";
import React from 'react';

export default class TableBoxExperience extends React.Component {
  onItemClick = async (round) => {
      let reData = await await window.$myContract.methods.getReferalEarnings(round).call();
      console.log(reData);
  }
  render(){
    return (
      <TableWrapper>
        <Title>{this.props.title}</Title>
        <List>
          <InnerList>
            <ExperienceTable padding={0}>
              <thead>
                <tr>
                  <th>Round </th>
                  <th>Status</th>
                  <th>Total Bet On Red</th>
                  <th>Total Bet On Blue</th>
                  <th>Revenue</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.expData.length > 0 &&
                this.props.expData.map(elem => {
                  return  <tr key={elem.id} onClick={()=>this.props.referal.onReferalEarning(elem.round)}>
                            <td>{elem.round}</td>
                            <td>{elem.onGoing==="true"?"Ongoing":"Finished"}</td>
                            <td>
                              <img src={EtheriumIcon} alt=""/> {Number(elem.redTotBet).toFixed(6)}
                            </td>
                            <td>
                              <img src={EtheriumIcon} alt=""/> {Number(elem.blueTotBet).toFixed(6)}
                            </td>
                            <td>
                              <img src={EtheriumIcon} alt=""/> {Number(elem.revenue).toFixed(6)}
                            </td>
                            <td>
                              <img src={EtheriumIcon} alt=""/> {Number(elem.profit).toFixed(6)}
                            </td>
                          </tr>
                })
              }
  
              </tbody>
            </ExperienceTable>
          </InnerList>
        </List>
      </TableWrapper>
    );  
  }
}
