import styled from "styled-components";
import MobileHeaderBg from "../../assets/header-mobile-bg.png";
import WebHeaderBg from "../../assets/header-web-bg.png";
import WideHeaderBg from "../../assets/header-wide-bg.png";
import ShieldBg from "../../assets/shield.png";
import ShieldWebBg from "../../assets/shield-web.png";
import ButtonBg from "../../assets/header-button-bg.png";
import ButtonWebBg from "../../assets/header-button-web-bg.png";
import BalanceBoxBg from "../../assets/account-box-bg.png";
import TextBoxBg from "../../assets/text-frame-1@2x.png";
import TextBoxWebBg from "../../assets/text-frame-1-web.png";
import TextBoxWideBg from "../../assets/text-frame-1-wide.png";
import CurrentRoundWrapperBg from "../../assets/current-round-wrapper-bg.png";
import CurrentRoundWrapperWebBg from "../../assets/current-round-wrapper-web-bg.png";
import CurrentRoundButtonBg from "../../assets/current-round-bg@2x.png";
import WinningBoxWrapperBg from "../../assets/winning-box-wrapper.png";
import WinningBoxTitleBg from "../../assets/winning-box-title.png";
import WinningBoxTitleWebBg from "../../assets/winning-box-title-web-bg.png";
import WinningBoxInfoBoxBg from "../../assets/winning-box-info-box.png";
import WinningBoxInfoBoxWebBg from "../../assets/winning-box-info-box-web.png";
import PersonalInfoWrapperBg from "../../assets/personal-info-bg.png";
import PersonalInfoWrapperWebBg from "../../assets/personal-info-web-bg.png";
import { breakpoints } from "../../core";
import { HistoryBoxWrapper } from "../HistoryBox/style";
import { Flag, PlayerBoxHeader, PlayerBoxWrapper } from "../PlayerBox/style";
import { TableWrapper } from "../TableBox/style";

export const Wrapper = styled.header`
  background: url(${MobileHeaderBg});
  background-size: 100% 54px;

  height: 54px;
  box-shadow: inset 0 4px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  padding: 0 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${breakpoints.web}) {
    background: url(${WebHeaderBg}) center top no-repeat;
    background-size: 100% 111px;
    height: 111px;
    padding: 0 60px;
  }

  @media (min-width: ${breakpoints.wide}) {
    background-image: url(${WideHeaderBg});
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 6px;

  @media (min-width: ${breakpoints.web}) {
    top: 9px;
  }

  img {
    height: 42px;

    @media (min-width: ${breakpoints.web}) {
      height: 98px;
    }
  }
`;

export const Text = styled.div`
  background: url(${ShieldBg}) left center no-repeat;
  color: #90cc54;
  font-size: 8px;
  font-weight: 700;
  line-height: 10px;
  width: 115px;
  padding-left: 23px;
  cursor: pointer;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${ShieldWebBg});
    width: 240px;
    padding-left: 40px;
    font-size: 12px;
    line-height: 19px;
    cursor:pointer;
  }
`;

export const HofButton = styled.button`
  background: url(${ButtonBg}) center no-repeat;
  color: #fac573;
  height: 32px;
  width: 109px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${ButtonWebBg});
    width: 140px;
    height: 58px;
    font-size: 18px;
  }
`;

export const RefButton = styled.button`
  background: url(${ButtonBg}) center no-repeat;
  color: #fac573;
  height: 32px;
  width: 109px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${ButtonWebBg});
    width: 140px;
    height: 58px;
    font-size: 18px;
  }
`;

export const PsnButton = styled.button`
  background: url(${ButtonBg}) center no-repeat;
  color: #fac573;
  height: 32px;
  width: 109px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${ButtonWebBg});
    width: 140px;
    height: 58px;
    font-size: 18px;
  }
`;

export const BalanceBox = styled.div`
  background: url(${BalanceBoxBg}) center no-repeat;
  width: 305px;
  height: 60px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right:0px;
  cursor: pointer;
  @media (max-width: ${breakpoints.web}) {
    display: none;
  }
`;

export const BalanceBoxTitle = styled.p`
  color: #e2cba6;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: 18px;
  text-align: center;
`;
export const BalanceBoxValue = styled.p`
  align-items: center;
  display: flex;
  font-weight: 700;
  text-align: center;
  color: #ffd37e;
  font-size: 18px;
  font-style: normal;
  letter-spacing: normal;
  line-height: 24px;

  img {
    margin-right: 6px;
  }
`;

export const TextArea = styled.p`
  background: url(${TextBoxBg}) center no-repeat;
  background-size: 100%;
  max-width: 345px;
  padding: 15px 23px;
  margin: 0 auto 15px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #ffd37e;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: 18px;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${TextBoxWebBg});
    width: 442px;
    max-width: inherit;
    margin: 0;
    height: 82px;
    padding: 15px 20px;
  }

  @media (min-width: ${breakpoints.wide}) {
    background-image: url(${TextBoxWideBg});
    width: 645px;
    padding-left: 88px;
    padding-right: 88px;
  }`;

export const CurrentRoundWrapper = styled.p`
  background: url(${CurrentRoundWrapperBg}) center no-repeat;
  max-width: 345px;

  margin: 0 auto 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 143px;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${CurrentRoundWrapperWebBg});
    background-size: 100% 82px;
    display: flex;
    flex-direction: row;
    margin: 0;
    width: 444px;
    height: 82px;
    max-width: inherit;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: ${breakpoints.wide}) {
    width: 645px;
    align-items: center;
    justify-content: center;
  }
`;

export const CurrentRoundButton = styled.button`
  background: url(${CurrentRoundButtonBg}) center no-repeat;
  background-size: 100%;
  margin-bottom: 15px;
  width: 175px;
  line-height: 36px;

  color: #ffd37e;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  padding-left: 29px;

  @media (min-width: ${breakpoints.web}) {
    margin: 0;
  }

  @media (min-width: ${breakpoints.wide}) {
    margin-right: 20px;
  }

  span {
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
  }
`;

export const EndsTitle = styled.p`
  /* Style for "This Round" */
  width: flex;
  height: 19px;
  color: #e2cba6;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

export const EndsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.web}) {
    align-items: flex-start;
  }
`;

export const EndsInfo = styled.p`
  /* Style for "5H 25M 16S" */
  width: 207px;
  height: 40px;
  text-shadow: 0 0 10px rgba(144, 204, 84, 0.4);
  color: #90cc54;
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
  margin-top: -10px;

  @media (min-width: ${breakpoints.web}) {
    text-align: left;
  }
`;

export const WinningBox = styled.div`
  background: url(${WinningBoxWrapperBg}) top no-repeat;
  padding-top: 58px;
  height: 217px;
  max-width: 345px;
  margin: 0 auto 15px;
  position: relative;

  @media (min-width: ${breakpoints.web}) {
    background: none;
    max-width: 906px;
    height: 62px;
    display: flex;
    justify-content: space-between;
    padding-top: 0;
    margin-bottom: 50px;
  }

  @media (min-width: ${breakpoints.wide}) {
    margin-bottom: 30px;
  }
`;
export const WinningBoxTitle = styled.div`
  background: url(${WinningBoxTitleBg}) center top no-repeat;
  width: 310px;
  height: 69px;
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #222222;
  font-size: 32px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${WinningBoxTitleWebBg});
    top: -9px;
    height: 85px;
    width: 442px;
    font-size: 38px;
  }

  span {
    color: ${props=>props.curIndex===2?"#5CB1Ff":props=>props.curIndex===1?"#D74C4C":"#363c6d"};
    margin-right: 6px;
  }
`;
export const WinningBoxInfoBox = styled.div`
  background: url(${WinningBoxInfoBoxBg}) center top no-repeat;
  width: 305px;
  height: 62px;
  margin: 0 auto 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${WinningBoxInfoBoxWebBg});
    margin: 0;
    width: 211px;
  }
`;

export const WinningBoxInfoBoxTitle = styled.div`
  color: #e2cba6;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: 18px;
  text-align: center;
`;
export const WinningBoxInfoBoxValue = styled.div`
  align-items: center;
  display: flex;
  font-weight: 700;
  text-align: center;
  color: #ffd37e;
  font-size: 18px;
  font-style: normal;
  letter-spacing: normal;
  line-height: 24px;

  img {
    margin-right: 6px;
  }
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  margin-top: 25px;

  @media (min-width: ${breakpoints.web}) {
    display: none;
  }
`;

export const WebBanner = styled(Banner)`
  display: none;
  @media (min-width: ${breakpoints.web}) {
    display: flex;
  }
`;

export const PersonalInfoWrapper = styled.div`
  background: url(${PersonalInfoWrapperBg});
  width: 345px;
  height: 260px;
  margin: 0 auto 25px;
  text-align: center;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${PersonalInfoWrapperWebBg});
    background-size: 100% 260px;
    margin-left: 0;
    margin-right: 0;
    width: 213px;
  }

  @media (min-width: ${breakpoints.wide}) {
    width: 308px;
  }
`;

export const PersonalInfoTitle = styled.h1`
  height: 62px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
  color: #e2cba6;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

export const PersonalInfoKey = styled.div`
  color: #e2cba6;
  font-style: normal;
  letter-spacing: normal;
  line-height: 24px;
  font-size: 12px;
`;

export const PersonalInfoValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd37e;
  font-size: 12px;
  font-style: normal;
  letter-spacing: normal;
  line-height: 24px;
  margin-bottom: 16px;

  img {
    margin-right: 6px;
  }
`;

export const PersonalInfoLink = styled.a`
  color: #d0d0d0;
  font-size: 12px;
  font-style: normal;
  letter-spacing: normal;
  line-height: 24px;
  text-decoration: underline;
`;

export const RowWrapper = styled.div`
  @media (min-width: ${breakpoints.web}) {
    display: flex;
    flex-direction: row-reverse;
    width: 906px;
    margin: 0 auto 35px;
    justify-content: space-between;
  }

  @media (min-width: ${breakpoints.wide}) {
    width: 1320px;
  }
`;

export const BoxWrapper = styled.div`
  @media (min-width: ${breakpoints.web}) {
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 0 154px;
    max-width: 906px;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.wide}) {
    max-width: 1320px;
    padding: 0 225px;
  }

  ${HistoryBoxWrapper} {
    @media (min-width: ${breakpoints.web}) {
      position: absolute;
      top: 0;
      left: 0;
      width: 133px;

      &:last-child {
        left: inherit;
        right: 0;
      }
    }

    @media (min-width: ${breakpoints.wide}) {
      width: 195px;
      top: -90px;
    }
  }

  ${PlayerBoxWrapper} {
    @media (min-width: ${breakpoints.web}) {
      width: 288px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(212, 107, 107, 0.5),
        inset 0 4px 30px rgba(0, 0, 0, 0.5);
    }
    @media (min-width: ${breakpoints.wide}) {
      width: 420px;
      margin: 0 0 30px;
    }
    ${Flag} {
      @media (min-width: ${breakpoints.web}) {
        left: 5px;
        width: 83px;
        height: 128px;
        background-size: 100%;
        background-repeat: no-repeat;
      }

      @media (min-width: ${breakpoints.wide}) {
        width: 157px;
        height: 240px;
        left: 15px;
      }
    }
    ${PlayerBoxHeader} {
      @media (min-width: ${breakpoints.web}) {
        padding-left: 94px;
        padding-top: 14px;
      }
      @media (min-width: ${breakpoints.wide}) {
        padding-left: 196px;
        padding-top: 30px;
      }
    }

    &:nth-child(2) {
      @media (min-width: ${breakpoints.web}) {
        box-shadow: 0 0 10px rgba(92, 177, 255, 0.5),
          inset 0 4px 30px rgba(0, 0, 0, 0.5);
      }

      ${PlayerBoxHeader} {
        @media (min-width: ${breakpoints.web}) {
          padding-left: 12px;
          padding-right: 90px;
        }

        @media (min-width: ${breakpoints.wide}) {
          padding-left: 37px;
          padding-right: 200px;
        }
      }

      ${Flag} {
        @media (min-width: ${breakpoints.web}) {
          left: inherit;
          right: 5px;
        }

        @media (min-width: ${breakpoints.wide}) {
          right: 15px;
        }
      }
    }
  }
`;

export const Line = styled.div`
  @media (min-width: ${breakpoints.web}) {
    display: flex;
    justify-content: space-between;
    max-width: 906px;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.wide}) {
    max-width: 1320px;
  }

  ${TableWrapper} {
    &:after {
      @media (min-width: ${breakpoints.web}) {
        display: none;
      }
    }
  }
`;
