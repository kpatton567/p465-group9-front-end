import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";

import theme from "../theme";
import NavPills from "../components/NavPills.js";

// @material-ui/icons
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ForumIcon from '@material-ui/icons/Forum';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(6),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  sidebarStyle: {
    marginLeft: 'auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, movieId } = props;
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [selectedTheatre, setSelectedTheatre] = React.useState('');
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  var test = [];
  const fetchData = React.useCallback(() => {
    axios({
      "method": "POST",
      "url": 'http://localhost:8080/api/home/movie_showtimes?movieId=' + movieId,
    })
      .then((response) => {
        console.log(response.data)
        setResponse(response.data)
        
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTheatreChange = (event) => {
    setSelectedTheatre(event.target.value);
  };
  const handleTheatreChangeSetTimes = (item) =>{
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    console.log("test")
  }

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
                      <Typography style={{ textTransform: 'none' }}>{description}</Typography>
                    )
                  },
                  {
                    tabButton: "Show time",
                    tabIcon: WatchLaterIcon,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem >
                          <Button onClick={handleClickOpen} style={{color: theme.palette.secondary.light}}>See availability</Button>
                          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                            <DialogTitle>Choose your theatre</DialogTitle>
                            <DialogContent>
                              <form className={classes.container}>
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="demo-dialog-native">Theatre/Showtime</InputLabel>
                                  <Select
                                    native
                                    input={<Input id="demo-dialog-native" />}
                                    onChange={handleTheatreChange}
                                    value={selectedTheatre}
                                    selected
                                  >
                                    {/* {response.map((item) =>
                                    <div onInput = {handleChange}>
                                    {item.showtimes.map((showtime =>
                                      <option>{item.theater.name},{showtime}</option>
                                    ))}
                                    </div>
                                    )} */}
                                    {response.map((item) =>
                                    <div>
                                    {item.showtimes.map((showtime =>
                                      <option>{item.theater.name}</option>
                                    ))}
                                    </div>
                                    )}
                                  </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="demo-dialog-native">Showtimes</InputLabel>
                                  <Select
                                    native
                                    input={<Input id="demo-dialog-native" />}
                                    
                                   >
                                    
                                    {response.map((item) =>{
                                    if(item.theater.name === {selectedTheatre})
                                    {
                                      item.showtimes.map((showtime) =>
                                       <option>{showtime}</option>
                                      )}
                                    })}

                                  </Select>
                                </FormControl>
                              </form>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                              <Button onClick={handleClose} color="primary">
                                Ok
          </Button>
                            </DialogActions>
                          </Dialog>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                      </GridContainer>
                    )
                  },
                  {
                    tabButton: "Book Tickets",
                    tabIcon: AttachMoneyIcon,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                      </GridContainer>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </Typography>

      </Paper>

    </Grid>
  );
}

Sidebar.propTypes = {
  movieId: PropTypes.string
};