import { container, title } from "../assets/jss/material-kit-react";
import imagesStyle from "../assets/jss/material-kit-react/imagesStyles.js";


const BHPageStyle = 
{
  container,
 
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  
  paper: {
      backgroundColor: '#FFFFFF',
    },

  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
 
  name: {
    marginTop: "-80px",
    color: "#C5C5C5",
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
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },

  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#FFFFFF",
  },

  title2: {
      marginTop: "80px",
      marginBottom: "25px",
      minHeight: "32px",
      textDecoration: "none",
      color: "#FFFFFF",
  },

  subtext: {
    minHeight: "32px",
    textDecoration: "none",
    color: "#C5C5C5",
    marginBottom: '20px',
},
subtext2: {
    minHeight: "32px",
    textDecoration: "none",
    color: "#C5C5C5",
    marginBottom: '15px',
    paddingBottom: '100px',
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
  },

  table: {
    marginLeft: '40px',
    marginRight: '40px',
  },
};

export default BHPageStyle;