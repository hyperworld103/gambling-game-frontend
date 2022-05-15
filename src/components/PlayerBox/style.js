import styled from "styled-components";
import PlayerBoxBg from "../../assets/player-box-bg.png";
import RedTeamFlag from "../../assets/RedTeam_Flag.png";
import RedTeamFlagWide from "../../assets/RedTeam_Flag-wide.png";
import BlueTeamFlag from "../../assets/BlueTeam_Flag.png";
import BlueTeamFlagWide from "../../assets/BlueTeam_Flag-wide.png";
import EtheriumInputBg from "../../assets/etherium-input-bg.png";
import EtheriumInputWebBg from "../../assets/etherium-input-web-bg.png";
import EtheriumInputWideBg from "../../assets/etherium-input-wide-bg.png";
import SubmitActiveBg from "../../assets/bet-active.png";
import SubmitActiveWebBg from "../../assets/bet-active-web.png";
import SubmitDisabledBg from "../../assets/bet-disabled.png";
import SubmitDisabledWebBg from "../../assets/bet-disabled-web.png";
import { ReactComponent as Etherium } from "../../assets/ethereum-icon.svg";
import PlayersBgImage from "../../assets/players.png";
import { breakpoints } from "../../core";

export const PlayerBoxWrapper = styled.div`
  background: url(${PlayerBoxBg}) center top no-repeat;
  background-size: 100% 622px;
  height: 622px;
  margin: 0 auto 15px;
  width: 345px;
  position: relative;
  
${'' /* 
  border:2px solid;
  border-color:#d74c4c;
  color: #d74c4c;
  box-shadow: 0 0 15px 8px;
  opacity: 0.8; */}


  @media (min-width: ${breakpoints.web}) {
    height: 618px;
    width: 288px;
  }

  @media (min-width: ${breakpoints.wide}) {
    width: 420px;
    margin: 0;
  }
`;

export const Flag = styled.div`
  width: 93px;
  height: 145px;
  position: absolute;
  left: 15px;
  top: 0;

  background: url(${({ color }) =>
    color === "red" ? RedTeamFlag : BlueTeamFlag});

  @media (min-width: ${breakpoints.wide}) {
    background: url(${({ color }) =>
      color === "red" ? RedTeamFlagWide : BlueTeamFlagWide});
    width: 157px;
    height: 240px;
  }
`;

export const PlayerBoxHeader = styled.header`
  padding-left: 137px;
  padding-top: 30px;
  margin-bottom: 66px;

  @media (min-width: ${breakpoints.wide}) {
    margin-bottom: 0;
  }
`;

export const HeaderTitle = styled.div`
  color: ${({ color }) => (color === "red" ? "#d74c4c" : "#5cb1ff")};
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  height: 19px;
  line-height: normal;
  text-align: left;
`;

export const ReceivedValue = styled.div`
  display: flex;
  align-items: center;
  text-shadow: 0 0 10px rgba(255, 122, 0, 0.5);
  color: #ffd37e;
  font-size: 40px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  height: 53px;
  text-align: right;

  img {
    margin-right: 16px;
    height: 30px;
  }
`;

export const ReceivedText = styled.div`
  color: #ffd37e;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
`;

export const QRCode = styled.div`
  width: 200px;
  margin: 0 auto 20px;
  height: 200px;

  img {
    display: block;
    width: 100%;
  }

  @media (min-width: ${breakpoints.web}) {
    flex: 0 0 67px;
    margin: 0 5px 0 0;
    height: 67px;
    width: 67px;
  }
`;

export const Desc = styled.div`
  width: 265px;
  margin: 0 auto 10px;
  color: #e2cba6;
  font-size: 12px;
  font-weight: 700;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    text-align: left;
    width: 190px;
    margin: 0 0 8px;
    font-size: 10px;
  }
`;

export const Address = styled.div`
  color: #ffd37e;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.web}) {
    text-align: left;
    font-size: 10px;
  }
`;

export const BettingSection = styled.div`
  background: url(${EtheriumInputBg}) left top no-repeat;
  width: 320px;
  margin: 0 auto;
  height: 112px;
  position: relative;
  padding: 19px 22px;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${EtheriumInputWebBg});
    width: 266px;
    padding: 15px 8px;
  }

  @media (min-width: ${breakpoints.wide}) {
    background: url(${EtheriumInputWideBg}) left top no-repeat;
    width: 390px;
    margin: 0 auto;
    height: 112px;
  }
`;

export const BettingSectionLine = styled.div`
  display: flex;
  align-items: center;
`;

export const BettingSectionInput = styled.input`
  background: none;
  border: 0;
  padding-left: 10px;

  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #ffd37e;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
`;

export const BettingSectionIcon = styled(Etherium)`
  * {
    fill: ${({ isActive }) => (isActive ? "#ffd37e" : "#645b4c")};
  }
`;
export const BettingSectionSummary = styled.div`
  width: 170px;

  @media (min-width: ${breakpoints.web}) {
    font-size: 12px;
    width: 100%;
  }
`;
export const BettingSectionSummaryIcon = styled(Etherium)`
  margin-right: 3px;
  * {
    fill: green;
  }
`;
export const BettingSectionSummaryText = styled.p`
  color: #90cc54;
`;
export const BettingSectionSummaryAltText = styled.span`
  color: #ffd37e;
  font-size: 8px;
  font-style: normal;
  letter-spacing: normal;
`;

export const Submit = styled.button`
  background: url(${SubmitActiveBg});
  width: 120px;
  position: absolute;
  right: 0;
  top: 21px;
  height: 75px;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${SubmitActiveWebBg});
    width: 98px;
    height: 85px;
    top: 14px;
  }

  @media (min-width: ${breakpoints.wide}) {
    background: url(${SubmitActiveBg});
    width: 120px;
    right: 0;
    top: 21px;
    height: 75px;
  }

  &:disabled {
    background: url(${SubmitDisabledBg});
    width: 118px;
    height: 71px;

    @media (min-width: ${breakpoints.web}) {
      background-image: url(${SubmitDisabledWebBg});
      width: 98px;
      height: 83px;
    }

    @media (min-width: ${breakpoints.wide}) {
      background: url(${SubmitDisabledBg});
      width: 118px;
      height: 71px;
    }
  }
`;

export const QrCodeWrapper = styled.div`
  @media (min-width: ${breakpoints.web}) {
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
    margin-top: 305px;
  }

  @media (min-width: ${breakpoints.wide}) {
    margin-top: 286px;
    padding: 0 15px;
  }
`;

export const QrCodeTextWrapper = styled.div`
  @media (min-width: ${breakpoints.web}) {
    display: flex;
    flex-direction: column;
  }
`;

export const PlayersWrapper = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoints.web}) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const PlayersBg = styled.div`
  display: none;
  @media (min-width: ${breakpoints.web}) {
    background: url(${PlayersBgImage});
    width: 504px;
    height: 221px;
    display: block;
    position: absolute;
    left: 50px;
    top: 138px;
    z-index: 100;
  }

  @media (min-width: ${breakpoints.wide}) {
    left: 194px;
    top: 149px;
  }
`;
