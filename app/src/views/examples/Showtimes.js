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



function Showtimes() 
{   
    const [cards, setCards] = React.useState([]);
    const [range, setSelectedRange] = React.useState('');

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


    const handleRangeChange = (event) => 
    {
        var toSend = "";

        if(event.target.value == 10)
        {
            toSend = "A";
        }
        else if(event.target.value == 20)
        {
            toSend = "G";
        }
        else if(event.target.value == 30)
        {
            toSend = "M";
        }
        else if(event.target.value == 40)
        {
            toSend = "S";
        }

        setSelectedRange(toSend);
    }

    const filterMovies = (event) =>
    {
        var sRange = null;

        if(range != '') sRange = range;

        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/home/search', /* need to update the URL here */
            "data": {
                range: sRange,
            }
        })
            .then((response) => {
                setCards(response.data);
            })
                .catch((error) => {
                    console.log(error)
                })
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
                            <InputLabel id="range-dropdown-label">First Letter</InputLabel>
                            <Select
                                label="Range"
                                labelId="range-dropdown-label"
                                id="range-dropdown"
                                onChange={handleRangeChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>A to F</MenuItem>
                                <MenuItem value={20}>G to L</MenuItem>
                                <MenuItem value={30}>M to R</MenuItem>
                                <MenuItem value={40}>S to Z</MenuItem>
                            </Select>
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
                                            <Button size="small" color="primary" href={`/movieshowtime/${card.id}`}>
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