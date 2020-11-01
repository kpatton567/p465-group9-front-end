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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { apiVariables } from '../../environmentVariables';

import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import { Chip, Box } from '@material-ui/core'
import { ChipSet } from '@material/react-chips';

import theme from "../theme";
import CancelIcon from '@material-ui/icons/Cancel';
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
    }
}));

export default function SelectSnacks(props) {
    const classes = useStyles();

    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": apiVariables.apiUrl + '/api/home/snacks/' + props.theaterId,
        })
            .then((response) => {
                // setResponse(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <Grid item xs={12} md={4} className={classes.sidebarStyle}></Grid>
    );
}