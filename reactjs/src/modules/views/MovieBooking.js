import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
// import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Sidebar from '../components/SideBar';

import post1 from '../assets/blog-post.1.md'
import post2 from '../assets/blog-post.2.md';
import post3 from '../assets/blog-post.3.md';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    mainBGcolor: {
        // backgroundColor : '#FFE5E5'
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
        marginLeft: theme.spacing(2.5),
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

const sections = [
    { title: 'User Reviews', url: '#', text: "Here is where we'll have user reviews", },
];

const mainFeaturedPost = {
    title: 'Title of the movie',
    description:
        "Movie caption",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    //   linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Movie Title',
        date: 'Language',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    }
];

const posts = [post1, post2, post3];




const sidebar = {
    title: 'Synopsis',
    description:
        'This is where the movie synopsis will go. uismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

export default function MovieBooking() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <React.Fragment >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.mainBGcolor}>
                {/* <Container  className={classes.mainBGcolor}> */}
                {/* <Header title="Blog" sections={sections} /> */}
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}


                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Card className={classes.root}>
                            <CardHeader
                                title="Movie Name"
                                subheader="Movie Caption"
                            />
                            <CardMedia
                                className={classes.media}
                                image={mainFeaturedPost.image}
                                title={mainFeaturedPost.title}
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
                                            <ListItemText primary="Movie Cast" secondary="Jan 9, 2014" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <WorkIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Genre" secondary="Jan 7, 2014" />
                                        </ListItem>
                                    </List>
                                </Typography>
                            </CardContent>
                        </Card>
                        {/* <Main title="From the firehose" posts={posts} /> */}
                        <Sidebar

                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
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
                </main>
            </Container>
            {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
        </React.Fragment>
    );
}