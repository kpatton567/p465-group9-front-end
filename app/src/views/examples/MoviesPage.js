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
import theme from '../theme';

const cardMedia = {
    paddingTop: '90%', // height of photo
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
                <ExamplesNavbar />
                <ProfilePageHeader posterLink={require("assets/img/fabio-mangione.jpg")} />
                <div className="section profile-content">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">
                                <br />
                                <br />
                                <h2>ALL MOVIES</h2>
                                <br />
                            </Col>
                        </Row>
                        <br />
                        <div style={{ display: 'flex',flexWrap: 'wrap' }}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={2} lg={3} style={{ margin: '10px', minWidth: '30%'}}>
                                    {/* Create each card using array from backend */}
                                    <Card style = {{height: '40vw'}}>
                                        <CardMedia
                                            style={cardMedia}
                                            image={card.posterLink}
                                        />
                                        <CardContent style={cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.title}
                                            </Typography>
                                            <Typography>
                                                {/* {processDescription(card.description)} */}
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
                        {/* Button at bottom of page to bring user back to top of page */}
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