import styled from "styled-components";
import background from "../../assets/popup-bg.png";
import closeButton from "../../assets/popup-close.png";


export const WrapperOver = styled.div`
  background: url(${background}) center top no-repeat;
  height: 150px;
  width: 345px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: fixed;
  z-index: 120;
  padding: 10px 30px 30px;
  color: white;
`;
export const OverText = styled.div`
  height: 30px;
  width: 100%;
  color: white;
  text-align: center;
  text-shadow: 0 0 10px #231b19;
  color: #52322b;
  font-size: 50px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  margin-top:10%;
  margin-bottom:30px;
`;
export const Wrapper = styled.div`
  background: url(${background}) center top no-repeat;
  height: 345px;
  width: 345px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: fixed;
  z-index: 120;
  padding: 10px 30px 30px;
  color: white;
`;

export const NumberBg = styled.div`
  height: 30px;
  width: 100%;
  color: white;
  text-align: center;
  text-shadow: 0 0 10px rgba(144, 204, 84, 0.4);
  color: #90cc54;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom:5px;
`;

export const CloseButton = styled.button`
  background-image: url(${closeButton});
  position: absolute;
  right: 20px;
  top: 20px;
  width: 22px;
  height: 22px;
`;

export const InnerList = styled.div`
  height: 255px;
  padding-right: 12px;
  line-height: 1.2;
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
