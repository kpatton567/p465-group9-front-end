import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
    },
    largeIcon: {
        fontSize: "7em",
    },
    successIcon: {
        color: 'green',
    },
    btnText: {
        backgroundColor: '#7B7B7B'
    },
}));
function ChooseRole() {
    const { user, isAuthenticated } = useAuth0();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [oldUser, setOldUser] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    if (user) {
        var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/auth/check_user?userId=' + userId
        })
            .then((response) => {
                console.log(response.data)
                setOldUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    if (user) {
        var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/auth/get_token?userId=' + userId
        })
            .then((response) => {
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //cometchat signup
    // if (user) {
    //     var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
    //     fetch("https://api-us.cometchat.io/v2.0/users", {
    //         "method": "POST",
    //         "headers": {
    //             "appId": "254719f4f395024",
    //             "apiKey": "d8dee6a22683724af8502b02929f601f6f30f43c",
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         "body": "{\"uid\":\"" + userId + "\",\"name\":\"" + user.name + "\",\"role\":\"customer\"}"
    //     })
    //         .then(response => {
    //         })
    //         .catch(err => {
    //         });
    // }

    if (user) {
        var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
        fetch("https://api-us.cometchat.io/v2.0/users", {
            "method": "POST",
            "headers": {
                "appId": "271914bcf8fbc65",
                "apiKey": "226d3c3f1ef783a149877ac828b3c001f390bf5a",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": "{\"uid\":\"" + userId + "\",\"name\":\"" + user.name + "\",\"role\":\"customer\"}"
        })
            .then(response => {
            })
            .catch(err => {
            });
    }
    //userId=-oauth2|117950300573138642682
    const registerUser = (userRole) => {

        var role = userRole;
        var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)

        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/auth/register?userId=' + userId + '&role=' + role
        })
            .then((response) => {
                console.log(response.data)
                setOldUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };
    return (
        isAuthenticated && (
            oldUser ?
                <div>{window.location.href = "/"}</div>
                :
                <div>
                    {/* <JSONPretty data={user} /> */}
                    <div className={classes.right}>
                        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                            <DialogTitle>Choose your profile</DialogTitle>
                            <DialogContent>
                                <Button className={classes.btnText} style={{ marginRight: '10px' }} href="/" onClick={() => registerUser("ROLE_CUSTOMER")}>
                                    <FaceIcon fontSize="large" className={classes.largeIcon} ></FaceIcon>
                                    Customer
                                </Button>
                                <Button className={classes.btnText} style={{ marginRight: '10px' }} href='/registerTheater' onClick={() => registerUser("ROLE_MANAGER")}>
                                    <SupervisorAccountIcon fontSize="large" className={classes.largeIcon}></SupervisorAccountIcon>
                                    Manager
                                </Button>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
        )
    )
}
export default (ChooseRole)