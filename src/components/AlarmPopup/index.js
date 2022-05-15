import { InnerList, Wrapper } from "./style";

export default function Popup({ children}) {
  return (
    <>
      <Wrapper >
        <InnerList>{children}</InnerList>
      </Wrapper>
    </>
  );
}
