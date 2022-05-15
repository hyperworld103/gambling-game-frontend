import {
  Address,
  InnerList,
  Item,
  List,
  Title,
  HistoryBoxWrapper,
} from "./style";

import {
  BettingSectionLine,
  BettingSectionSummary,
  BettingSectionSummaryAltText,
  BettingSectionSummaryIcon,
  BettingSectionSummaryText
} from "../PlayerBox/style";


export default function HistoryBox({ color, teamName, info }) {
  return (
    <HistoryBoxWrapper>
      <Title color={color}>The Payment History of {teamName} Team</Title>
      <List>
        <InnerList>
        {
          info && info.length>0 &&
          info.map(elem=>{
              return  <Item key={elem.id}>
                        <Address><a href={elem.trans_address} style={{color:"#85c1f8"}}
                                  rel="noreferrer" target="_blank">{elem.trans_address}</a></Address>
                        <BettingSectionSummary>
                          <BettingSectionLine>
                            <BettingSectionSummaryIcon />
                            <BettingSectionSummaryText>{Number(elem.amount).toFixed(8)}</BettingSectionSummaryText>
                          </BettingSectionLine>
                          <BettingSectionSummaryText>
                            = {Number(elem.amount - elem.fee).toFixed(8)}{" "}
                            <BettingSectionSummaryAltText>
                              + fee {Number(elem.fee).toFixed(8)}
                            </BettingSectionSummaryAltText>{" "}
                          </BettingSectionSummaryText>
                          <BettingSectionSummaryAltText>
                            ={Number(100-elem.fee*100/elem.amount).toFixed(3)} % share | status: LOSS
                          </BettingSectionSummaryAltText>
                        </BettingSectionSummary>
                      </Item>
          })
        }
        </InnerList>
      </List>
    </HistoryBoxWrapper>
  );
}
