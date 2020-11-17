import React from "react";

// reactstrap components
import {
  Button,
} from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import MoviesCarousel from "views/examples/MoviesCarousel";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      {/* <LandingPageHeader /> */}
      <IndexHeader/>
      <div className="main">
        <div className="section text-center"></div> 
        <MoviesCarousel/>
        <div className="section text-center"></div>
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;
