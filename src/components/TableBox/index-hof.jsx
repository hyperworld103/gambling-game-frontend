import {
  HofTable,
  InnerList,
  List,
  HofWrapper,
  Title
 } from "./style";
import EtheriumIcon from "./../../assets/ethereum-icon.svg";

export default function HofTableWrapper({ title, data }) {

  return (
    <HofWrapper>
      <Title>{title}</Title>
      <List>
        <InnerList>
          <HofTable padding={0}>
            <thead>
              <tr>
                <th>Address:</th>
                <th>Total Revenue:</th>
                <th>Total Profit:</th>
              </tr>
            </thead>
            <tbody>
            {
              data.length > 0 &&
                data.map(elem => {
                  <tr key={elem.id}>
                    <td>{elem.player}</td>
                    <td>
                      <img src={EtheriumIcon} alt="" /> {Number(elem.tot_revenue).toFixed(6)}
                    </td>
                    <td>
                      <img src={EtheriumIcon} alt="" /> {Number(elem.tot_profit).toFixed(6)}
                    </td>
                  </tr>
              })
            }

            </tbody>
          </HofTable>
        </InnerList>
      </List>
    </HofWrapper>
  );
}
