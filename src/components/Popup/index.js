import { InnerList, NumberBg, Wrapper } from "./style";

export default function Popup({children, title , leftTimeBeforeGame }) {
  return (
    <>
      <Wrapper >
        <NumberBg>{title}</NumberBg>
        <NumberBg>{leftTimeBeforeGame}</NumberBg>
        <InnerList>{children}</InnerList>
      </Wrapper>
    </>
  );
}
