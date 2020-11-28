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
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '../../components/Typography/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
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



function MoviesPage() 
{   
    const [cards, setCards] = React.useState([]);
    const [theaters, setTheaters] = React.useState([]);
    const [theaterId, setSelectedTheatre] = React.useState('');
    const [price, setSelectedPrice] = React.useState('');
    const [date, setSelectedDate] = React.useState('');


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
        
        // populate the theaters list
        axios({
            "method": "GET",
            "url": apiVariables.apiUrl + '/api/home/theaters',
        })
            .then((response) => {
                setTheaters(response.data)
            })
                .catch((error) => {
                    console.log(error)
                })
    }, [])
    React.useEffect(() => 
    {
        fetchData()
    }, [fetchData])


    const handleTheaterChange = (event) => 
    {
        setSelectedTheatre(event.target.value);
    }

    const handlePriceChange = (event) => 
    {
        var toSend = "";

        if(event.target.value == 10)
        {
            toSend = "LOW";
        }
        else if(event.target.value == 20)
        {
            toSend = "MID";
        }
        else
        {
            toSend = "HIGH";
        }

        setSelectedPrice(toSend);
    }

    const handleDateChange = (event) => 
    {
        setSelectedDate(event.target.value);
    }

    const filterMovies = (event) =>
    {
        var sDate = null;
        var sTheater = null;
        var sPrice = null;

        if(date != '') sDate = date;
        if(theaterId != '') sTheater = theaterId;
        if(price != '') sPrice = price;

        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/home/search',
            "data": {
                date: sDate,
                theater: sTheater,
                price: sPrice,
            }
        })
            .then((response) => {
                // console.log(response.data);
                setCards(response.data);
            })
                .catch((error) => {
                    console.log(error)
                })
    }


    return (
        <>
            <ExamplesNavbar />
            {/* Page title */}
            <ProfilePageHeader posterLink={require("assets/img/fabio-mangione.jpg")} />
            <div className="section profile-content">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <br />
                            <br />
                            <h2>ALL MOVIES</h2>
                            <br />
                            <br />
                            <br />
                        </Col>
                    </Row>
                    <br />

                    {/* Search filters */}
                    <div>
                        <FormControl variant="outlined" style={formControl}>
                            <InputLabel id="theater-dropdown-label">Theater</InputLabel>
                            <Select
                                label="Theater"
                                labelId="theater-dropdown-label"
                                id="theater-dropdown"
                                onChange={handleTheaterChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* Populate from backend */}
                                {theaters.map((theater) => (
                                    <MenuItem value={theater.id}>{theater.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={formControl}>
                            <InputLabel id="price-dropdown-label">Price Range</InputLabel>
                            <Select
                                label="Price"
                                labelId="price-dropdown-label"
                                id="price-dropdown"
                                onChange={handlePriceChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>$0.00 - $4.99</MenuItem>
                                <MenuItem value={20}>$5.00 - $9.99 </MenuItem>
                                <MenuItem value={30}>$10.00 +</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={formControl}>
                            <form style={container} noValidate>
                                <TextField
                                    label="Date"
                                    id="date"
                                    type="date"
                                    style={textField}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
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
                                        {'Apply Filters'}
                                    </Button>
                                </div>
                            </section>
                        </FormControl>
                    </div>

                    {/* All movie cards */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={2} lg={3} style={{ margin: '10px', minWidth: '30%' }}>
                                <Card style={{ height: '40vw' }}>
                                    <CardMedia
                                        style={cardMedia}
                                        image={card.posterLink}
                                    />
                                    <CardContent style={cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                    {/* Book Tickets Button */}
                                    <CardActions>
                                        <Link>
                                            <Button size="small" color="primary" href={`/moviebooking/${card.id}`}>
                                                {'Book Tickets'}
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </div>

                    {/* Button at bottom to bring user back to top of page */}
                    <section style={root}>
                        <div style={container2}>
                            <Button
                                color="secondary"
                                variant="contained"
                                size="large"
                                style={button}
                                href="/movies"
                            >
                                {'Back to Top'}
                            </Button>
                        </div>
                    </section>
                </Container>
            </div>
            <DemoFooter />
        </>
    );
}
export default MoviesPage;