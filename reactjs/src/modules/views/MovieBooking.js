import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Sidebar from '../components/SideBar';
import AppAppBar from './AppAppBar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import './MovieBooking.css';
import AppFooter from './AppFooter';
import axios from 'axios';



const mainFeaturedPost = {
    title: 'Title of the movie',
    description:
        "Movie caption",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    //   linkText: 'Continue reading…',
};
const useStyles = makeStyles((theme) => ({
    mainGrid: {
        paddingTop: theme.spacing(6),
        textAlign: 'center'
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    root: {
        maxWidth: 345,
        display: 'block',
        width: '20vw',
        transitionDuration: '0.3s',
        padding: 0,
        "&:last-child": {
            paddingRight: 0
        },
        margin: 0,
        float: "right",
        marginLeft: theme.spacing(10),
        height: 'fit-content'
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    sidebarStyle: {
        marginLeft: 'auto'
    }
}));

export default function MovieBooking(props) {
    const classes = useStyles();

    let [movie, setMovie] = React.useState('');
    let [genres, setGenres] = React.useState([]);
    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": 'http://localhost:8080/api/home/movie/' + props.match.params.movie,
        })
            .then((response) => {
                setMovie(response.data)
                setGenres(response.data.genres);
                // console.log(response.data.genres);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])
    const sidebar = {
        title: 'Synopsis',
        description: movie.description
    };
    return (
        <React.Fragment >
            <CssBaseline />
            <Container
                class="mainBGcolor"
            >
                <AppAppBar />
                <div class="bg-image" style={{ backgroundImage: `url(${movie.posterLink})` }}></div>
                <div class="bg-text">
                    <Grid container className={classes.mainGrid}>
                        <Card className={classes.root}>
                            <CardHeader
                                title={movie.title}
                            // subheader={state.resp.description}
                            />
                            <CardMedia
                                className={classes.media}
                                image={movie.posterLink}
                                title={movie.title}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" disableSpacing>
                                    <List className={classes.listRoot}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Movie Cast" secondary="Movie Cast" />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <WorkIcon />
                                                </Avatar>
                                            </ListItemAvatar>


                                            <ListItemText primary="Genre"
                                                secondary={
                                                    <div>
                                                        {genres.map((genre) => (
                                                            <div>{genre.genre}</div>
                                                        ))}
                                                    </div>

                                                } />

                                        </ListItem>
                                    </List>
                                </Typography>
                            </CardContent>
                        </Card>
                        {/* <Main title="From the firehose" posts={posts} /> */}
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            movieId={props.match.params.movie}
                        />
                    </Grid>
                    {/* tabs about the movie */}
                    {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                        {sections.map((section) => (
                            <Link
                                color="inherit"
                                noWrap
                                key={section.title}
                                variant="body2"
                                href={section.url}
                                className={classes.toolbarLink}
                            >
                                {section.title}
                                {section.text}
                            </Link>
                        ))}
                    </Toolbar> */}
                    {/* </main> */}
                </div>
            </Container>
            
            <AppFooter/>
        </React.Fragment>
    );
}