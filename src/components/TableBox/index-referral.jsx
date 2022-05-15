import { InnerList, List, ReferralTable, TableWrapper, Title } from "./style";
import EtheriumIcon from "./../../assets/ethereum-icon.svg";

export default function TableBoxReferral({ title, data }) {
  return (
    <TableWrapper>
      <Title>{title}</Title>
      <List>
        <InnerList>
          <ReferralTable padding={0}>
            <thead>
              <tr>
                <th>Address:</th>
                <th>Earnings:</th>
              </tr>
            </thead>
            <tbody>
            {
              data.length > 0 &&
                data.map(elem => {
                  <tr key={elem.id}>
                    <td>{elem.referer}</td>
                    <td>
                      <img src={EtheriumIcon} alt="" /> {Number(elem.amount).toFixed(6)}
                    </td>
                  </tr>
              })
            }
            </tbody>
          </ReferralTable>
        </InnerList>
      </List>
    </TableWrapper>
  );
}
