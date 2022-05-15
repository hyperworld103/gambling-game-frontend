import styled from "styled-components";
import FooterBg from "../../assets/footer-bg.png";
import FooterWebBg from "../../assets/footer-web-bg.png";
import FooterButtonWebBg from "../../assets/footer-button-web-bg.png";
import { HofButton, RefButton, PsnButton } from "../Home/style";
import { breakpoints } from "../../core";

export const Wrapper = styled.footer`
  background: url(${FooterBg}) center top no-repeat;
  background-size: 100% 78px;
  height: 78px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Style for "FOOTER" */
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #ffd37e;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: ${breakpoints.web}) {
    background-image: url(${FooterWebBg});
    height: 82px;
    background-size: 100% 82px;
  }

  ${HofButton} {
    position: absolute;
    right: 23px;
    top: 23px;

    @media (min-width: ${breakpoints.web}) {
      background-image: url(${FooterButtonWebBg});
      width: 217px;
      height: 58px;
      top: 12px;
    }
  }

  ${RefButton} {
    position: absolute;
    right: 137px;
    top: 23px;

    @media (min-width: ${breakpoints.web}) {
      background-image: url(${FooterButtonWebBg});
      width: 217px;
      height: 58px;
      top: 12px;
    }
  }

  ${PsnButton} {
    position: absolute;
    right: 250px;
    top: 23px;

    @media (min-width: ${breakpoints.web}) {
      background-image: url(${FooterButtonWebBg});
      width: 217px;
      height: 58px;
      top: 12px;
    }
  }

`;
