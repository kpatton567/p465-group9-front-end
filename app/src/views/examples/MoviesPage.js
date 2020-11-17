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


import theme from '../theme';

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
    minWidth: 120,
};
const selectEmpty = {
    marginTop: theme.spacing(2),
};



class MoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        };
    }
    componentDidMount() {
        const fetchMovies = async () => {
            const res = await axios.get(apiVariables.apiUrl + '/api/home/movies');
            this.setState({ cards: res.data })
        };
        fetchMovies();
    }
    handleSubmitClick(e) {
        console.log("Test");
    }
    render() {
        const { cards } = this.state;
        return (
            <>
                {/* Header bar */}
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
                                <InputLabel htmlFor="outlined-age-native-simple">Theater</InputLabel>
                                <Select
                                    native
                                    //   value={state.age}
                                    //   onChange={handleChange}
                                    label="Age"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>AMC</option>
                                    <option value={20}>IMAX</option>
                                    <option value={30}>Carmike</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" style={formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Date</InputLabel>
                                <Select
                                    native
                                    //   value={state.age}
                                    //   onChange={handleChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'filled-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Jan 10, 2021</option>
                                    <option value={20}>Jan 11, 2021</option>
                                    <option value={30}>Jan 14, 2021</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" style={formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Price</InputLabel>
                                <Select
                                    native
                                    //   value={state.age}
                                    //   onChange={handleChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'filled-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Low Price</option>
                                    <option value={20}>Average Price</option>
                                    <option value={30}>Higher Price</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={formControl}>
                               <Typography style={theme.typography2}>
                                   Filter Results
                               </Typography>
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
}
export default MoviesPage;