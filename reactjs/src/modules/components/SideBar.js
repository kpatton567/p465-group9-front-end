import React, { useState } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { format } from "date-fns";

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
  },
  sidebarAvailabilityBox: {
    // padding: theme.spacing(2),
    // margin: theme.spacing(6),
    // backgroundColor: 'grey'
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, title, movieId } = props;

  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [theatres, setTheatres] = React.useState([]);
  const [showtimes, setShowTimes] = React.useState([]);

  const fetchData = React.useCallback(() => {
    axios({
      "method": "POST",
      "url": 'http://localhost:8080/api/home/movie_showtimes?movieId=' + movieId,
    })
      .then((response) => {
        setResponse(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
    // var date = new Date("2016-01-04 10:34:23");
    // var formattedDate = format(date, "MMMM Do, yyyy H:mma");

  // console.log(formattedDate);
  }, [fetchData])

  const handleTheatreChange = (id,event) => {
    console.log(id)
    // setTheatres(Number(event.target.value) || '');
    // setShowTimes(response.items);
  };
  const handleChange = (event) => {
    // setTheatres(Number(event.target.value) || '');
  };

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
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Paper elevation={0} className={classes.sidebarAboutBox}
      >
        <div className={classes.sidebarAvailabilityBox}>
          <Button onClick={handleClickOpen}>See availability</Button>
          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Choose your theatre</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="demo-dialog-native">Theatre</InputLabel>
                  <Select
                    native
                    // onChange={(handleTheatreChange)}
                    input={<Input id="demo-dialog-native" />}
                  >
                    {response.map((item) => 
                    <option key={item.theater.id} value={item.theater.name} onChange={(e) => handleTheatreChange(item.theater.id, e)}>{item.theater.name}</option>
                    )}

                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-dialog-select-label">Show Times</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={showtimes}
                    onChange={handleChange}
                    input={<Input />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* {showtimes.map((showtime) => ( */}
                    {/* <MenuItem value={showtime}>showtime</MenuItem> */}
                    ))
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
        </div>
      </Paper>
    </Grid>
  );
}

Sidebar.propTypes = {
  movieId: PropTypes.string
};