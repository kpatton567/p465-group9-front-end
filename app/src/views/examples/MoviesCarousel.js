import React from "react";
import axios from 'axios';
import  { apiVariables } from '../../APIConstants';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import {Button} from "reactstrap";   

export default function MoviesCarousel(){
    const [images, setImages] = React.useState([]);
    const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": apiVariables.apiUrl +'/api/home/movies'
    })
      .then((response) => {
        // setImages(response.data)
        setImages([...images,
          {
            url: response.data[0].posterLink,
            title: response.data[0].title,
            width: '33%',
            id: '1',
          },
          {
            url: response.data[1].posterLink,
            title: response.data[1].title,
            width: '33%',
            id: '2',
          },
          {
            url: response.data[2].posterLink,
            title: response.data[2].title,
            width: '33%',
            id: '3',
          },
          {
            url: response.data[3].posterLink,
            title: response.data[3].title,
            width: '33%',
            id: '4',
          },
          {
            url: response.data[4].posterLink,
            title: response.data[4].title,
            width: '33%',
            id: '5',
          },
          {
            url: response.data[5].posterLink,
            title: response.data[5].title,
            width: '33%',
            id: '6',
          },
          {
            url: response.data[6].posterLink,
            title: response.data[6].title,
            width: '33%',
            id: '7',
          },
          {
            url: response.data[7].posterLink,
            title: response.data[7].title,
            width: '33%',
            id: '8',
          },
          {
            url: response.data[8].posterLink,
            title: response.data[8].title,
            width: '33%',
            id: '9',
          }
      ,]);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  if(images.length > 0)
  return (
    <MDBContainer>
    <Button className="btn-round" color="neutral" type="button" style={{float:'right'}}>
                View More
    </Button>
    <Button
    className="btn-link"></Button>
    <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
    
      <MDBCarouselInner>
        <MDBRow>
          <MDBCarouselItem itemId="1">
          <div className='row' style={{display:'flex'}}>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[0].url} />
                <MDBCardBody>
                  <MDBCardTitle>{images[0].title}</MDBCardTitle>
                  <MDBCardText>{images[0].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[0].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
              <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[1].url}/>
                <MDBCardBody>
                  <MDBCardTitle>{images[1].title}</MDBCardTitle>
                  <MDBCardText>{images[1].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[1].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[2].url}/>
                <MDBCardBody>
                <MDBCardTitle>{images[2].title}</MDBCardTitle>
                  <MDBCardText>{images[2].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[2].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            </div>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
          <div className='row' style={{display:'flex'}}>
            <MDBCol md="4">
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[3].url} />
                <MDBCardBody>
                <MDBCardTitle>{images[3].title}</MDBCardTitle>
                  <MDBCardText>{images[3].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[3].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[4].url}/>
                <MDBCardBody>
                <MDBCardTitle>{images[4].title}</MDBCardTitle>
                  <MDBCardText>{images[4].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[4].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[5].url} />
                <MDBCardBody>
                <MDBCardTitle>{images[5].title}</MDBCardTitle>
                  <MDBCardText>{images[5].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[5].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            </div>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
          <div className='row' style={{display:'flex'}}>
            <MDBCol md="4">
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[6].url} />
                <MDBCardBody>
                <MDBCardTitle>{images[6].title}</MDBCardTitle>
                  <MDBCardText>{images[6].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[6].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[7].url}/>
                <MDBCardBody>
                <MDBCardTitle>{images[7].title}</MDBCardTitle>
                  <MDBCardText>{images[7].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[7].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" style={{display:'flex'}}>
              <MDBCard className="mb-2">
                <MDBCardImage className="img-fluid" src={images[8].url} />
                <MDBCardBody>
                <MDBCardTitle>{images[8].title}</MDBCardTitle>
                  <MDBCardText>{images[8].description}</MDBCardText>
                  <MDBBtn color="primary" href={`/moviebooking-page/${images[8].id}`}>Book Tickets</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            </div>
          </MDBCarouselItem>
        </MDBRow>
      </MDBCarouselInner>
    </MDBCarousel>
  </MDBContainer>

  )
  if(images.length == 0)
  return null;
}