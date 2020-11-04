import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import theme from "../theme";
import CancelIcon from '@material-ui/icons/Cancel';
import NavPills from "../components/NavPills.js";
import ForumIcon from '@material-ui/icons/Forum';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import Checkout from '../views/Checkout';


const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    // backgroundColor: "transparent",
    margin: theme.spacing(6),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  sidebarStyle: {
    marginLeft: 'auto'
    // marginTop: theme.spacing(10)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  boxStyle: {
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    margin: theme.spacing(1)
  },
  listItem: {
    padding: theme.spacing(2, 2),
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, movieId } = props;
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Grid item xs={12} md={4} className={classes.sidebarStyle}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>

          <GridContainer >
            <GridItem className={classes.navWrapper}>

              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Synopsis",
                    tabIcon: ForumIcon,
                    tabContent: (
                      <Typography style={{ textTransform: 'none', padding:'20px' }}>{description}</Typography>
                    )
                  },
                  {
                    tabButton: "Reviews",
                    tabIcon: ThumbsUpDownIcon,
                    tabContent: (
                      <Typography style={{ textTransform: 'none', padding:'20px' }}>"The script keeps the audience glued to their seats all through the movie. The cast excelled themselves. A must watch for all movie lovers."</Typography>
                    )
                  }
                ]}
              />
             
            </GridItem>
          </GridContainer>
         
        </Typography>
        
      </Paper>
      <Button onClick={handleClickOpen} style={{ backgroundColor: theme.palette.secondary.light, }} >Book Tickets</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}
maxWidth = {'sm'}>
      <CancelIcon onClick={handleClose} style={{ cursor: 'pointer', marginTop: '10px', width: '40px', marginLeft: theme.spacing(70)}} />
        <Checkout movieId={movieId}/>
      </Dialog>
    </Grid>
  );
}

Sidebar.propTypes = {
  movieId: PropTypes.string
};