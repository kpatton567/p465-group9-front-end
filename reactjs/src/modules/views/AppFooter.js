import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#363636',
    color: "#FFFFFF"
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    
    <Typography component="footer" className={classes.root}>
      <Divider light />
      <Container className={classes.container}>

        {/* Licensing info */}
        <Grid container spacing={5}>
          <Grid item>
            <Typography variant="caption">
              {'Text of the footer goes here'}
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </Typography>
  );
}