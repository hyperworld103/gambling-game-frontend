import styled from "styled-components";
import HistoryBoxBg from "../../assets/history-box-bg.png";
import TablePeoples from "../../assets/table-people.png";
import TablePeoplesWide from "../../assets/table-people-wide.png";
import { breakpoints } from "../../core";
import closeButton from "../../assets/popup-close.png";


export const HofWrapper = styled.div`
  background: url(${HistoryBoxBg}) center top no-repeat;
  background-size: 100% 710px;
  height: 710px;
  margin: 0 auto 20px;
  max-width: 345px;
  overflow: hidden;

  @media (max-width: ${breakpoints.web}) {
    max-width: 597px;
    position: relative;
    margin-right: 300px;
  }

  @media (min-width: ${breakpoints.wide}) {
    max-width: 646px;
  }

  &:after {
    @media (min-width: ${breakpoints.web}) {
      background: url(${TablePeoples}) center top no-repeat;
      content: "";
      display: block;
      width: 931px;
      height: 147px;
      position: absolute;
      left: 40px;
      z-index: -1;
      top: 415px;
    }

    @media (min-width: ${breakpoints.wide}) {
      background-image: url(${TablePeoplesWide});
      width: 1240px;
      height: 287px;
    }
  }
`;

export const TableWrapper = styled.div`
  background: url(${HistoryBoxBg}) center top no-repeat;
  background-size: 100% 710px;
  height: 710px;
  margin: 0 auto 20px;
  max-width: 345px;
  margin-left:300px;
  overflow: hidden;

  @media (min-width: ${breakpoints.web}) {
    max-width: 597px;
    position: relative;
    margin-right: 0;
    margin-left: 0;
  }

  @media (min-width: ${breakpoints.wide}) {
    max-width: 646px;
  }

  &:after {
    @media (min-width: ${breakpoints.web}) {
      background: url(${TablePeoples}) center top no-repeat;
      content: "";
      display: block;
      width: 931px;
      height: 147px;
      position: absolute;
      left: 40px;
      z-index: -1;
      top: 415px;
    }

    @media (min-width: ${breakpoints.wide}) {
      background-image: url(${TablePeoplesWide});
      width: 1240px;
      height: 287px;
    }
  }
`;

export const CloseButton = styled.button`
  background-image: url(${closeButton});
  position: absolute;
  right: 20px;
  top: 20px;
  width: 22px;
  height: 22px;
`;

export const Title = styled.div`
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
  color: #e2cba6;
  font-size: 18px;
  font-weight: 700;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  letter-spacing: normal;
  line-height: 21.02px;
`;

export const List = styled.div`
  padding: 17px;
  height: 650px;
  overflow: hidden;
`;
export const InnerList = styled.div`
  height: 620px;
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: #7c756a;
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: #eac48b;
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #eac48b;
  }
`;

export const ExperienceTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  @media (min-width: ${breakpoints.wide}) {
    width: 646px;
  }
  th {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    text-align: left;

    &:first-child {
      width: 43px;
    }

    &:nth-child(2) {
      width: 61px;
    }
    &:nth-child(3) {
      width: 103px;
      color: #d74c4c;
    }
    &:nth-child(4) {
      width: 153px;
      color: #5cb1ff;
    }
    &:nth-child(5) {
      width: 113px;
    }
    &:nth-child(6) {
      position: relative;
      &:after {
        position: absolute;
        content: "";
        display: block;
        background-image: linear-gradient(
          to left,
          #0e0f15 0%,
          rgba(14, 15, 21, 0) 100%
        );
        right: 0;
        top: 0;
        width: 45px;
        bottom: 0;
        z-index: 100;

        @media (min-width: ${breakpoints.web}) {
          display: none;
        }
      }
    }
  }

  td {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    padding: 0;

    &:last-child {
      position: relative;
      &:after {
        position: absolute;
        content: "";
        display: block;
        background-image: linear-gradient(
          to left,
          #0e0f15 0%,
          rgba(14, 15, 21, 0) 100%
        );
        right: 0;
        top: 0;
        width: 65px;
        bottom: 0;
        z-index: 100;

        @media (min-width: ${breakpoints.web}) {
          display: none;
        }
      }
    }

    img {
      margin-right: 4px;
    }
  }

  tr {
    &:hover {
      td {
        background-image: linear-gradient(
          to bottom,
          rgba(82, 51, 14, 0.5) 0%,
          rgba(0, 0, 0, 0) 48%,
          rgba(82, 51, 14, 0.5) 100%
        );
      }
    }
  }
`;

export const ReferralTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  @media (min-width: ${breakpoints.web}) {
    width: 211px;
  }

  @media (min-width: ${breakpoints.wide}) {
    width: 308px;
  }
  th {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    text-align: left;

    &:first-child {
      width: 200px;
    }

    &:nth-child(2) {
      width: 80px;
    }
  }

  td {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    padding: 0;

    img {
      margin-right: 4px;
    }
  }
`;

export const HofTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  th {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    text-align: left;

    &:first-child {
      width: 95px;
      position: relative;

      @media (min-width: ${breakpoints.web}) {
        width: 232px;
      }

      &:after {
        position: absolute;
        content: "";
        display: block;
        background-image: linear-gradient(
          to left,
          #0e0f15 0%,
          rgba(14, 15, 21, 0) 100%
        );
        right: 0;
        top: 0;
        width: 45px;
        bottom: 0;
        z-index: 100;

        @media (min-width: ${breakpoints.web}) {
          display: none;
        }
      }
    }

    &:nth-child(2) {
      width: 80px;
      padding-left: 6px;
    }
    &:nth-child(3) {
      width: 80px;
    }
  }

  td {
    font-size: 12px;
    color: #e2cba6;
    font-style: normal;
    letter-spacing: normal;
    line-height: 24px;
    padding: 0;

    &:nth-child(2) {
      padding-left: 6px;
    }

    &:first-child {
      position: relative;
      &:after {
        position: absolute;
        content: "";
        display: block;
        background-image: linear-gradient(
          to left,
          #0e0f15 0%,
          rgba(14, 15, 21, 0) 100%
        );
        right: 0;
        top: 0;
        width: 95px;
        bottom: 0;
        z-index: 100;

        @media (min-width: ${breakpoints.web}) {
          display: none;
        }
      }
    }

    img {
      margin-right: 4px;
    }
  }
`;
