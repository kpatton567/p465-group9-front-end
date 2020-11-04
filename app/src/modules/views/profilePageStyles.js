import { container, title } from "../assets/jss/material-kit-react";
import imagesStyle from "../assets/jss/material-kit-react/imagesStyles.js";
import theme from '../theme';
const profilePageStyle = {
  container,
  subtext: {
    minHeight: "200px",
    textDecoration: "none",
    color: "#C5C5C5",
},
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    textAlign: "center !important"
  },
  name: {
    marginTop: "-80px",
    color: '#C5C5C5',
    marginBottom: '50px',
  },
  ...imagesStyle,
  main: {
    background: "#363636",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: '#FFFFFF',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: 'primary',
    backgroundColor: '#800000',
  },
  buttonHover :{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: 'primary',
    backgroundColor: '#363636',
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  }
};
export default profilePageStyle;