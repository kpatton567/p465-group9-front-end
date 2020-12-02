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

function BookingHistoryPage() {

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  let userId = ''
  if(user){
    userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
  }
  const [orders, setOrders] = React.useState([]);

  const fetchData = React.useCallback(() => {
  var token = localStorage.getItem(ACCESS_TOKEN_NAME)

  axios.get(apiVariables.apiUrl + '/api/customer/payment_history', {
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
        <ExamplesNavbar />
        <ProfilePageHeader posterLink={require("assets/img/historybg.jpg")} />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={user.picture}
                />
              </div>
              <div className="name">
                <h4 className="title">
                  {user.nickname} <br />
                </h4>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                    Go through your previous orders, give a rating and add a review for your previous movies and help others pick a movie
              </p>
                <br />
              </Col>
            </Row>
            <br />
            <Card>
                <CardHeader>
                  <CardTitle tag="h4">Booking History</CardTitle>
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
                        <td><Button href={`/addReview/${userId}/${item.movieName}`}>Add a review</Button></td>
                        </tr>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
          </Container>
        </div>
        <DemoFooter />
      </>
    );
}

export default BookingHistoryPage;