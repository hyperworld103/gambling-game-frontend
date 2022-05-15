import styled from "styled-components";
import background from "../../assets/popup-bg.png";

export const PopupOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
`;

export const Wrapper = styled.div`
  background: url(${background}) center top no-repeat;
  height: 100px;
  width: 345px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: fixed;
  z-index: 120;
  color: white;
`;

export const InnerList = styled.div`
  height: 255px;
  padding-right: 12px;
  line-height: 1.2;
  overflow: auto;
  text-align:center;
  margin-top:10%;

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
