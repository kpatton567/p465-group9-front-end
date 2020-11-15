import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import '../styles/MovieBookingPage.scss'
// reactstrap components
import {
  Button, Container, Row, Col, NavItem,
  NavLink,
  Nav, Pagination,Modal,
  PaginationItem,
  PaginationLink,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle
} from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import  { apiVariables } from '../../APIConstants';
// import CancelIcon from '@material-ui/icons/Cancel';
import Checkout from './Checkout';

function MovieBookingPage(props) {
  const [open, setOpen] = React.useState(false);
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  let [movie, setMovie] = React.useState('');
  let [genres, setGenres] = React.useState([]);
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": apiVariables.apiUrl + '/api/home/movie/' + props.match.params.movie,
    })
      .then((response) => {
        setMovie(response.data)
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if(movie)
  return (
    <div className="mainBGcolor ">
      <ExamplesNavbar />
    <header className="banner" style={{backgroundSize : "cover", backgroundImage: `url(${movie.posterLink})`,
    backgroundPosition: 'center center'}}>
      <div className = "banner_contents">
        <h1 className="banner_title">{movie.title}</h1>
        <Pagination>
          <PaginationItem>
            <PaginationLink
              aria-label="Genre"
              href="#pablo"
            >
              <span className="sr-only">Previous</span>
              Genre
            </PaginationLink>
          </PaginationItem>
        </Pagination>              
        <h1 className="banner_description" title={movie.description}>{truncate(movie.description, 150)}</h1>
        <div className = "banner_buttons">
          {/* <button className="banner_button" href="">Book Tickets</button> */}
          <Button onClick={handleClickOpen} className="banner_button" >Book Tickets</Button>
          <Button
            href="/movies"
          >
            {'MORE MOVIES'}
          </Button>
                            
      <Modal disableBackdropClick disableEscapeKeyDown isOpen={open} >
      {/* <CancelIcon onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px'}} /> */}
      <i class="nc-icon nc-simple-remove"  onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px'}}/>
        <Checkout movieId={props.match.params.movie}/>
      </Modal>
        </div>
      </div>
      <div className="banner_fadeBottom"/>
    </header> 
    </div>
  )
  if(!movie)
  return null;
}

export default MovieBookingPage;
