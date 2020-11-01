// import React from "react";
// import { useAuth0 } from '@auth0/auth0-react';
// import { withStyles } from '@material-ui/core/styles';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// import theme from "../theme";
// import FaceIcon from '@material-ui/icons/Face';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import AppBar from '../components/AppBar';
// import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
// import Home from '../../Home';
// import  { apiVariables } from '../../environmentVariables';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontSize: 24,
//     },
//     placeholder: toolbarStyles(theme).root,
//     toolbar: {
//         justifyContent: 'space-between',
//     },

//     left: {
//         flex: 1,
//     },

//     leftLinkActive: {
//         color: theme.palette.common.white,
//     },

//     right: {
//         flex: 1,
//         display: 'flex',
//         justifyContent: 'flex-end',
//     },

//     rightLink: {
//         fontSize: 16,
//         color: theme.palette.common.white,
//         marginLeft: theme.spacing(3),
//     },

//     linkSecondary: {
//         color: theme.palette.secondary.main,
//     },
//     largeIcon: {
//         fontSize: "7em"
//     },
//     successIcon: {
//         color: 'green',
//     }
// }));

// function IsLoading() {

//     const { user, isAuthenticated } = useAuth0();
//     // const userId = user ? user.sub.substring(6) : '';
//     const [userId, setUserId] = React.useState();
//     const [oldUser, setOldUser] = React.useState('');
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(true);

//     console.log(userId);

//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleUserId = () => {
//         if(user)
//             setUserId(user.sub.substring(6))
//     }
//    const registerUser = (userRole) => {
//     var role = userRole;
//     axios({
//         "method": "POST",
//         "url": apiVariables.apiUrl + '/api/auth/register?userId=' + userId +'&role='+ role
//     })
//         .then((response) => {
//             console.log(response.data)
//             // setOldUser(response.data)
//         })
//         .catch((error) => {
//             console.log(error)
//         })

//     console.log(role);
//    };

//     const fetchData = React.useCallback(() => {

//         axios({
//             "method": "POST",
//             "url": apiVariables.apiUrl +'/api/auth/check_user?userId=' + userId
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 setOldUser(response.data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }, [])
//     React.useEffect(() => {
//         fetchData()
//         handleUserId()
//     }, [fetchData])

//     return (
//         oldUser ?
//             <Home></Home>
//             :
//             <div className={classes.right}>
//                 <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
//                   <DialogTitle>Choose your profile</DialogTitle>
//                   <DialogContent>
//                     <Button style={{ marginRight: theme.spacing(6) }} href= "/home" onClick={ () => registerUser("ROLE_CUSTOMER") }>
//                       <FaceIcon fontSize="large" className={classes.largeIcon} ></FaceIcon>
//                       Customer
//                   </Button>
//                     <Button style={{ marginRight: theme.spacing(6) }} href='/registerTheater' onClick={ () => registerUser("ROLE_MANAGER") }>
//                       <SupervisorAccountIcon fontSize="large" className={classes.largeIcon}></SupervisorAccountIcon>
//                       Manager
//                   </Button>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                       Ok
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//             </div>
//     )
// }
// export default (IsLoading);

import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import theme from "../theme";
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import Home from '../../Home';
import { apiVariables } from '../../environmentVariables';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },

    left: {
        flex: 1,
    },

    leftLinkActive: {
        color: theme.palette.common.white,
    },

    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },

    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },

    linkSecondary: {
        color: theme.palette.secondary.main,
    },
    largeIcon: {
        fontSize: "7em"
    },
    successIcon: {
        color: 'green',
    }
}));
    

const IsLoading = () => {
    const { user, isAuthenticated } = useAuth0();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    
    if(user){
        console.log(user);
        axios({
        "method": "POST",
        "url": apiVariables.apiUrl +'/api/auth/check_user?userId=' + user.sub.substring(6)
        })
        .then((response) => {
            console.log(response.data)
            // setOldUser(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
        
    const registerUser = (userRole) => {
    var role = userRole;
    axios({
        "method": "POST",
        "url": apiVariables.apiUrl + '/api/auth/register?userId=' + user.sub.substring(6) +'&role='+ role
    })
        .then((response) => {
            console.log(response.data)
            // setOldUser(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

   };
    return (
        isAuthenticated && (
            <div>
                {/* <JSONPretty data={user} /> */}
                <div className={classes.right}>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>Choose your profile</DialogTitle>
                        <DialogContent>
                            <Button style={{ marginRight: theme.spacing(6) }} href="/home" onClick={() => registerUser("ROLE_CUSTOMER")}>
                                <FaceIcon fontSize="large" className={classes.largeIcon} ></FaceIcon>
                                Customer
                </Button>
                            <Button style={{ marginRight: theme.spacing(6) }} href='/registerTheater' onClick={() => registerUser("ROLE_MANAGER")}>
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

export default IsLoading