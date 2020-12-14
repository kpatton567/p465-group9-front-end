import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import '../styles/MovieBookingPage.scss'
import Rating from '@material-ui/lab/Rating';
// reactstrap components
import {
  Button,
  Pagination, Modal,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBCol } from "mdbreact";
import { useAuth0 } from '@auth0/auth0-react';
import Client from "./Client.js";
import axios from 'axios';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import Checkout from './Checkout';
import Box from '@material-ui/core/Box';
function MovieBookingPage(props) {
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  let [movie, setMovie] = React.useState('');
  let [genres, setGenres] = React.useState([]);
  const { user } = useAuth0();
  const [isCustomer, setIsCustomer] = React.useState(false);
  const [theaters, setTheaters] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  let [reviewChunks, setReviewChunks] = React.useState([]);
  var userId = ''
  if(user){
    userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
  }
  if (user) {
    var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const body = {};
    axios.post(apiVariables.apiUrl + '/api/auth/user_role', body, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data === 'ROLE_CUSTOMER') {
          setIsCustomer(true);
        }
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  const fetchData = React.useCallback(() => {
    axios({ 
      "method": "GET",  
      "url": apiVariables.apiUrl + '/api/home/movie/' + props.match.params.movie,
    })
      .then((response) => {
        setMovie(response.data)
        console.log(response.data)
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error)
      })
    axios({
      "method": "POST",
      "url": apiVariables.apiUrl + '/api/home/movie_showtimes?movieId=' + props.match.params.movie,
    })
      .then((response) => {
        console.log(response.data)
        setTheaters(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    axios({
      "method": "GET",
      "url": apiVariables.apiUrl + '/api/home/reviews/' + props.match.params.movie,
    })
      .then((response) => {
        setReviews(response.data)
        setReviewChunks(splitArrayIntoChunksOfLen(response.data, 3))
        reviewChunks = splitArrayIntoChunksOfLen(response.data, 3)
      })
      .catch((error) => {
        console.log(error)
      })
    axios({
      "method": "GET",
      "url": apiVariables.apiUrl + '/api/home/star_rating/' + props.match.params.movie,
    })
      .then((response) => {
        setValue(response.data.averageRating)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  function splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (movie && (isCustomer))
    return (
      <div className="mainBGcolor">
        <ExamplesNavbar style = {{backgroundColor : 'black !important'}}/>
        <Client theaters={theaters} userId={userId} userName={user ? user.nickname : ''} managerId='5f8b6eb173ef49007032ca5b' />
        <header className="banner" style={{
          backgroundSize: "cover", backgroundImage: `url(${movie.posterLink})`,
          backgroundPosition: 'center center'
        }}>
          <div className="banner_contents">
            <h1 className="banner_title">{movie.title}</h1>
            <Pagination style={{ marginRight: '15px', float: 'left' }}>
              <PaginationItem>
            <PaginationLink
                  aria-label="Genre"
                  href="#pablo"
                  style = {{borderRadius: '30px'}}
                >
                  <span className="sr-only">Previous</span>
                  Horror
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink
                  aria-label="Genre"
                  href="#pablo"
                  style = {{borderRadius: '30px'}}
                >
                  <span className="sr-only">Previous</span>
                  Thriller
            </PaginationLink>
              </PaginationItem>

            </Pagination>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={value} readOnly size="large" />
            </Box>
            <h1 className="banner_description" title={movie.description}>{truncate(movie.description, 150)}</h1>
            <div className="banner_buttons">
            <Button
                  className="btn-round mr-1"
                  color="primary"
                  outline
                  type="button"
                  onClick={handleClickOpen}
                  style = {{ backgroundColor: '#51cbce', color:'white'}}
                >
                  Book Tickets
                </Button>
                <Button
                  className="btn-round mr-1"
                  color="primary"
                  outline
                  type="button"
                  href='/movies'
                  style = {{ backgroundColor: '#51cbce', color:'white'}}
                >
                  More Movies
                </Button>
              <Modal disableBackdropClick disableEscapeKeyDown isOpen={open} contentClassName="custom-modal-style">
                <i className="nc-icon nc-simple-remove" onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px', marginLeft: 'auto' }} />
                <Checkout movieId={props.match.params.movie} isCustomer={isCustomer} style={{width : '50rem'}}/>
              </Modal>
            </div>
            <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem style={{ paddingRight: '10rem', paddingTop: '8rem' }}>
              <MDBCarouselInner >
                <MDBRow>
                  {reviewChunks.map((reviewChunk, index) =>
                    <MDBCarouselItem itemId={index+1}>
                      <div className='row' style={{display:'flex'}}>
                        {reviewChunk.map((item, i) =>
                          <MDBCol md="4" style={{ display: 'flex' }}>
                            <div>
                            {/* <Rating name="read-only" value={value} readOnly size="small" /> */}
                            <div className="typography-line">
                              <blockquote className="blockquote">
                              {/* <Rating name="read-only" value={value} readOnly size="small" /> */}
                                <p className="mb-0" style = {{fontWeight: '600', lineHeight: '1',
                                paddingTop: '.8rem', paddingBottom : '1rem'}}>
                                  {item.headline}
                                </p>
                                <p className="mb-0 review_description">
                                {item.review}
                                </p>
                                <br />
                              </blockquote>
                            </div>
                            </div>
                          </MDBCol>
                        )}
                      </div>
                    </MDBCarouselItem>
                  )}
                </MDBRow>
              </MDBCarouselInner>
            </MDBCarousel>
          </div>
          <div className="banner_fadeBottom" />
        </header>
      </div>
    )
  if (movie && !isCustomer)
    return (
      <div className="mainBGcolor">
        <ExamplesNavbar style = {{backgroundColor : 'black !important'}}/>
        <header className="banner" style={{
          backgroundSize: "cover", backgroundImage: `url(${movie.posterLink})`,
          backgroundPosition: 'center center'
        }}>
          <div className="banner_contents">
            <h1 className="banner_title">{movie.title}</h1>
            <Pagination style={{ marginRight: '15px', float: 'left' }}>
              <PaginationItem>
                <PaginationLink
                  aria-label="Genre"
                  href="#pablo"
                  style = {{borderRadius: '30px'}}
                >
                  <span className="sr-only"></span>
                  Horror
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink
                  aria-label="Genre"
                  href="#pablo"
                  style = {{borderRadius: '30px'}}
                >
                  <span className="sr-only"></span>
                  Thriller
            </PaginationLink>
              </PaginationItem>
            </Pagination>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={value} readOnly size="large" />
            </Box>
            <h1 className="banner_description" title={movie.description}>{truncate(movie.description, 150)}</h1>
            <div className="banner_buttons">
            <Button
                  className="btn-round mr-1"
                  color="primary"
                  outline
                  type="button"
                  onClick={handleClickOpen}
                  style = {{ backgroundColor: '#51cbce', color:'white'}}
                >
                  Book Tickets
                </Button>
                <Button
                  className="btn-round mr-1"
                  color="primary"
                  outline
                  type="button"
                  href="/movies"
                  style = {{ backgroundColor: '#51cbce', color:'white'}}
                >
                  More Movies
                </Button>
              <Modal disableBackdropClick disableEscapeKeyDown isOpen={open} contentClassName="custom-modal-style">
                <i className="nc-icon nc-simple-remove" onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px', marginLeft: 'auto' }} />
                <Checkout movieId={props.match.params.movie} isCustomer={isCustomer} style={{width : '45rem'}}/>
              </Modal>

            </div>
            <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem style={{ paddingRight: '10rem', paddingTop: '8rem' }}>
              <MDBCarouselInner >
                <MDBRow>
                  {reviewChunks.map((reviewChunk, index) =>
                    <MDBCarouselItem itemId={index+1}>
                      <div className='row' style={{display:'flex'}}> 
                        {reviewChunk.map((item, i) =>
                          <MDBCol md="4" style={{ display: 'flex' }}>
                            <div>
                            {/* <Rating name="read-only" value={value} readOnly size="small" /> */}
                            <div className="typography-line">
                              <blockquote className="blockquote">
                              {/* <Rating name="read-only" value={value} readOnly size="small" /> */}
                                <p className="mb-0" style = {{fontWeight: '600', lineHeight: '1',
                                paddingTop: '.8rem', paddingBottom : '1rem'}}>
                                  {item.headline}
                                </p>
                                <p className="mb-0 review_description">
                                {item.review}
                                </p>
                                <br />
                              </blockquote>
                            </div>
                            </div>
                          </MDBCol>
                        )}
                      </div>
                    </MDBCarouselItem>
                  )}
                </MDBRow>
              </MDBCarouselInner>
            </MDBCarousel>
          </div>
          <div className="banner_fadeBottom" />
        </header>
      </div>
    )
  if (!movie)
    return null;
}
export default MovieBookingPage;