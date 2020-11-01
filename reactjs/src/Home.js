import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {

  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <React.Fragment >
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );  
}

// export default withRoot(Index);
export default withRoot(Home);


// import withRoot from './modules/withRoot';
// // --- Post bootstrap -----
// import React from 'react';
// import ProductCategories from './modules/views/ProductCategories';
// import { makeStyles } from '@material-ui/core/styles';
// import ProductSmokingHero from './modules/views/ProductSmokingHero';
// import AppFooter from './modules/views/AppFooter';
// import ProductHero from './modules/views/ProductHero';
// import ProductValues from './modules/views/ProductValues';
// import AppAppBar from './modules/views/AppAppBar';
// import { useAuth0 } from '@auth0/auth0-react';
// import Button from '@material-ui/core/Button';
// import theme from "./modules/theme";
// import FaceIcon from '@material-ui/icons/Face';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import axios from 'axios';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import { styles as toolbarStyles } from './modules/components/Toolbar';

// const useStyles = makeStyles((theme) => ({
//   title: {
//       fontSize: 24,
//   },
//   // placeholder: toolbarStyles(theme).root,
//   toolbar: {
//       justifyContent: 'space-between',
//   },

//   left: {
//       flex: 1,
//   },

//   leftLinkActive: {
//       color: theme.palette.common.white,
//   },

//   right: {
//       flex: 1,
//       display: 'flex',
//       justifyContent: 'flex-end',
//   },

//   rightLink: {
//       fontSize: 16,
//       color: theme.palette.common.white,
//       marginLeft: theme.spacing(3),
//   },

//   linkSecondary: {
//       color: theme.palette.secondary.main,
//   },
//   largeIcon: {
//       fontSize: "7em"
//   },
//   successIcon: {
//       color: 'green',
//   }
// }));

// function Home() {

//   const { isAuthenticated, user } = useAuth0();
//   const { isLoading } = useAuth0();
//   const [open, setOpen] = React.useState(true);
//   const [userId, setUserId] = React.useState('');
//   const [oldUser, setOldUser] = React.useState('');
//   const classes = useStyles();

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const registerUser = (userRole) => {

//     var role = userRole;
//     axios({
//         "method": "POST",
//         "url": 'http://localhost:8080/api/auth/register?userId=' + userId +'&role='+ role
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

//   const fetchData = React.useCallback(() => {

//     if (user) {
//       setUserId(user.sub.substring(6));
//     }
//     axios({
//       "method": "POST",
//       "url": 'http://localhost:8080/api/auth/check_user?userId=' + userId
//     })
//       .then((response) => {
//         console.log(response.data)
//         setOldUser(response.data)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }, [])
//   React.useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   if (isLoading) return <div>Loading...</div>

//   return (
//     oldUser ?
//       <React.Fragment >
//         <AppAppBar />
//         <ProductHero />
//         <ProductValues />
//         <ProductCategories />
//         <ProductSmokingHero />
//         <AppFooter />
//       </React.Fragment>
//       :
//       <div className={classes.right}>
//         <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
//           <DialogTitle>Choose your profile</DialogTitle>
//           <DialogContent>
//             <Button style={{ marginRight: theme.spacing(6) }} href="/home" onClick={() => registerUser("ROLE_CUSTOMER")}>
//               <FaceIcon fontSize="large" className={classes.largeIcon} ></FaceIcon>
//               Customer
//                   </Button>
//             <Button style={{ marginRight: theme.spacing(6) }} href='/registerTheater' onClick={() => registerUser("ROLE_MANAGER")}>
//               <SupervisorAccountIcon fontSize="large" className={classes.largeIcon}></SupervisorAccountIcon>
//               Manager
//                   </Button>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Ok
//                     </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//   );
// }

// // export default withRoot(Index);
// export default withRoot(Home);