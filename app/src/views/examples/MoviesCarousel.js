import React from "react";
import axios from 'axios';
import { apiVariables } from '../../APIConstants';
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard,
  MDBCardBody, MDBCardTitle, MDBBtn
} from "mdbreact";
import { Button, Container, Row, Col } from "reactstrap";

export default function MoviesCarousel() {
  const [images, setImages] = React.useState([]);
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": apiVariables.apiUrl + '/api/home/movies'
    })
      .then((response) => {
        console.log(response.data)
        setImages([...images,
        {
          url: response.data[0].posterLink,
          title: response.data[0].title,
          width: '33%',
          id: response.data[0].id,
        },
        {
          url: response.data[1].posterLink,
          title: response.data[1].title,
          width: '33%',
          id: response.data[1].id,
        },
        {
          url: response.data[2].posterLink,
          title: response.data[2].title,
          width: '33%',
          id: response.data[2].id,
        },
        {
          url: response.data[3].posterLink,
          title: response.data[3].title,
          width: '33%',
          id: response.data[3].id,
        },
        {
          url: response.data[4].posterLink,
          title: response.data[4].title,
          width: '33%',
          id: response.data[4].id,
        },
        {
          url: response.data[5].posterLink,
          title: response.data[5].title,
          width: '33%',
          id: response.data[5].id,
        },
        {
          url: response.data[6].posterLink,
          title: response.data[6].title,
          width: '33%',
          id: response.data[6].id,
        },
        {
          url: response.data[7].posterLink,
          title: response.data[7].title,
          width: '33%',
          id: response.data[7].id,
        },
        {
          url: response.data[8].posterLink,
          title: response.data[8].title,
          width: '33%',
          id: response.data[8].id,
        }
          ,]);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  if (images.length > 0)
    return (
      <div className="section section-dark">
        <Container>
          <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
              <h2 style = {{fontFamily: 'serif',lineHeight: '1.15em',letterSpacing: '-.04em',fontWeight: '400',fontSize: '72px',fontStyle: 'italic'}} 
              className="title">Curated movies</h2>
          </Col>
            <MDBContainer>
              <Button href='/movies' className="btn-round" color="neutral" type="button" style={{ float: 'right' }}>
                View More
              </Button>
              <Button
                className="btn-link"></Button>
              <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
                <MDBCarouselInner>
                  <MDBRow>
                    <MDBCarouselItem itemId="1">
                      <div className='row' style={{ display: 'flex' }}>
                        <MDBCol md='4'>
                        <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[7].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[7].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[7].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                          
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[1].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[1].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[1].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[2].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[2].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[2].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                      </div>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                      <div className='row' style={{ display: 'flex' }}>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[3].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[3].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[3].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[4].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[4].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[4].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[5].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[5].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[5].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                      </div>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                      <div className='row' style={{ display: 'flex' }}>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[6].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[6].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[6].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[0].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[0].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[0].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md='4'>
                          <MDBCard
                            className='card-image'
                            style={{
                              backgroundImage:
                                "url('" + images[8].url + "')",
                              backgroundSize: 'cover',
                              height: '25rem'
                            }}
                          >
                            <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '25rem' }}>
                              <div style = {{marginTop: '15rem'}}>
                                <MDBCardBody>
                                  <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong style={{ color: 'white' }}>{images[8].title}</strong>
                                  </MDBCardTitle>
                                  <MDBBtn color="primary" href={`/movieBooking/${images[8].id}`}>Book Tickets</MDBBtn>
                                </MDBCardBody>
                              </div>
                            </div>
                          </MDBCard>
                        </MDBCol>
                      </div>
                    </MDBCarouselItem>
                  </MDBRow>
                </MDBCarouselInner>
              </MDBCarousel>
            </MDBContainer>
          </Row>
        </Container>
      </div>
    )
  if (images.length == 0)
    return null;
}