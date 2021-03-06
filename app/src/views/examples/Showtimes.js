import React, { Component } from "react";
import axios from "axios";
import { apiVariables } from '../../APIConstants';
// reactstrap components
import {
    Container,
    Row,
    Col,
} from "reactstrap";
// core components
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '../../components/Typography/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import theme from '../theme';

const container = {
    display: 'flex',
    flexWrap: 'wrap',
};
const textField = {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
};
const cardMedia = {
    paddingTop: '100%', // height of photo
};
const cardContent = {
    flexGrow: 1,
};
// For footer button
const root = {
    color: theme.palette.common.black,
    position: 'relative',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 10,
        maxHeight: 40,
    },
};
const container2 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
};
const button = {
    minWidth: 250,
    marginBottom: theme.spacing(4),
};
const formControl = {
    margin: theme.spacing(1),
    minWidth: 140,
};
const formControl2 = {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
};
function Showtimes() 
{   
    const [cards, setCards] = React.useState([]);
    const [searchVal, setValue] = React.useState('');

    // Initial page load
    const fetchData = React.useCallback(() => 
    {
        axios({
            "method": "GET",
            "url": apiVariables.apiUrl + '/api/home/movies',
        })
            .then((response) => {
                setCards(response.data)
            })
                .catch((error) => {
                    console.log(error)
                })
    }, [])
    React.useEffect(() => 
    {
        fetchData()
    }, [fetchData])


    const filterMovies = (event) =>
    {
        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/home/movie_search',
            "data": {
                term: searchVal,
            },
        })
            .then((response) => {
                setCards(response.data);
            })
                .catch((error) => {
                    console.log(error)
                })
    }

    const saveValue = (event) => {
        setValue(event.target.value);            
    }


    return (
        <>
            <div className="section profile-content">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </Col>
                    </Row>
                    <br />
                    <div>                        
                        <FormControl variant="outlined" style={formControl}>
                        <TextField 
                            id="outlined-search" 
                            label="Search for movies..." 
                            type="search" 
                            variant="outlined"
                            onChange={saveValue}
                        />
                        </FormControl>
                        <FormControl variant="outlined" style={formControl2}>
                            <section style={root}>
                                <div style={container2}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        onClick={filterMovies}
                                    >
                                        {'Filter Movies'}
                                    </Button>
                                </div>
                            </section>
                        </FormControl>
                    </div>
                    {/* All movie cards */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={2} lg={3} style={{ margin: '10px', minWidth: '30%' }}>
                                <Card style={{ height: '25vw' }}>
                                    <CardMedia
                                        style={cardMedia}
                                        image={card.posterLink}
                                    />
                                    <CardContent style={cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        {/* <Typography>
                                            {card.description}
                                        </Typography> */}
                                    </CardContent>
                                    {/* Book Tickets Button */}
                                    <CardActions>
                                        <Link>
                                            <Button size="small" color="primary" href={`/addShowtime/${card.id}`} target = '_blank' >
                                                {'Add Showtime'}
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    );
}
export default Showtimes;