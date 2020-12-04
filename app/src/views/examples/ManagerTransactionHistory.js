import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button
  // reactstrap components
} from "reactstrap";
import axios from 'axios';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
// core components
import { useAuth0 } from '@auth0/auth0-react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ManagerTransactionHistory() {

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  let userId = ''
  if(user){
    userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
  }
  const [orders, setOrders] = React.useState([]);

  const fetchData = React.useCallback(() => {
  var token = localStorage.getItem(ACCESS_TOKEN_NAME)

  axios.get(apiVariables.apiUrl + '/api/manage/transaction_history', {
  headers: {
      'Authorization': 'Bearer ' + token
  }
  })
 .then((response) => {
    console.log(response.data)
    setOrders(response.data);
  })
  .catch((error) => {
    console.log(error)
  })
}, [])
React.useEffect(() => {
  fetchData()
}, [fetchData])

  if (!isAuthenticated && isLoading) {
    return (<div>
    </div>)
  }
  if (!isAuthenticated && !isLoading) {
    return (<div>
      Loading
    {loginWithRedirect()}
    </div>)
  }
  if (isAuthenticated && !isLoading && user)
    return (
        <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Order #</th>
                        <th>Order Date</th>
                        <th>Movie Name</th>
                        <th>Theater Name</th>
                        <th>Payment Method</th>
                        <th>Bill Amount</th>    
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map((item) =>
                        <tr>   
                        <td>{item.paymentId}</td>
                        <td>{item.date}</td>
                        <td>{item.movieName}</td>
                        <td>{item.theaterName}</td>
                        <td>**********{item.last4Digits}</td>
                        <td>${item.total}</td>
                        <td><Button href={`/addReview/${userId}/${item.movieId}/${item.movieName}`}>Add a review</Button></td>
                        </tr>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default ManagerTransactionHistory;