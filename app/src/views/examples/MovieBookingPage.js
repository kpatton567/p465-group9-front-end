import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import '../styles/MovieBookingPage.scss'
// reactstrap components
import {
  Button,
  Pagination,Modal,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';
import  { apiVariables, ACCESS_TOKEN_NAME  } from '../../APIConstants';
// import CancelIcon from '@material-ui/icons/Cancel';
import Checkout from './Checkout';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../../consts';

function MovieBookingPage(props) {
  const [open, setOpen] = React.useState(false);
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  let [movie, setMovie] = React.useState('');
  let [genres, setGenres] = React.useState([]);
  const {user} = useAuth0();
  const [isCustomer, setIsCustomer] = React.useState(false);

  if(user){
    CometChat.login(user.sub.substring(6),COMETCHAT_CONSTANTS .API_KEY).then(
      User => {
          console.log("Login Successful:", { User });
          // User logged in successfully.
      },
      error => {
          console.log("Login failed with exception:", { error });
          // User login failed, check error and take appropriate action.
      }
      );
  }
  if(user){
    var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const body = {};
      axios.post(apiVariables.apiUrl +'/api/auth/user_role', body, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }).then(function (response) {
            if(response.status === 200){
              if(response.data == 'ROLE_CUSTOMER'){
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
  const handleClickChatOpen = () => {
    
  }
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
        <Button onClick={handleClickOpen} className="banner_button" >Book Tickets</Button>
          <Button
            href="/movies"
          >
            {'MORE MOVIES'}
        </Button>
        <h1 className="banner_description" title={movie.description}>{truncate(movie.description, 150)}</h1>
        <div className = "banner_buttons">
      
        
      <Modal disableBackdropClick disableEscapeKeyDown isOpen={open} >
      <i class="nc-icon nc-simple-remove"  onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px', marginLeft: 'auto'}}/>
        <Checkout movieId={props.match.params.movie} isCustomer={isCustomer}/>
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
