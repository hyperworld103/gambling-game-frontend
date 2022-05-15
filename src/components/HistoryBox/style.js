import styled from "styled-components";
import HistoryBoxBg from "../../assets/history-box-bg.png";
import { breakpoints } from "../../core";

export const HistoryBoxWrapper = styled.div`
  background: url(${HistoryBoxBg}) center top no-repeat;
  background-size: 100% 710px;
  height: 710px;
  margin: 0 auto 20px;
  max-width: 345px;

  @media (min-width: ${breakpoints.web}) {
    height: 618px;
    background-size: 100% 618px;
  }

  @media (min-width: ${breakpoints.wide}) {
    height: 710px;
    background-size: 100% 710px;
  }
`;

export const Title = styled.div`
  color: ${({ color }) => (color === "red" ? "#d74c4c" : "#5cb1ff")};
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 126px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.web}) {
    width: 94px;
    font-size: 10px;
  }
`;

export const List = styled.div`
  padding: 17px;
  height: 650px;
  overflow: hidden;

  @media (min-width: ${breakpoints.web}) {
    height: 540px;
    padding: 6px;
  }
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

export const Address = styled.div`
  color: #ffd37e;
  font-size: 12px;
  font-weight: 700;
`;

export const Item = styled.div`
  * {
    line-height: 1.2;
  }
`;
