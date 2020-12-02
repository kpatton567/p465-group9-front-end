import React from "react";

// reactstrap components
import "react-responsive-carousel/lib/styles/carousel.min.css";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import MoviesCarousel from "views/examples/MoviesCarousel";
import DiscoverMovies from "views/examples/DiscoverMovies"
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import ContactUs from 'views/examples/ContactUs.js';

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
      <ExamplesNavbar style= {{ borderBlock: 'unset' }}/>
      <LandingPageHeader />
      {/* <IndexHeader/> */}
      <DiscoverMovies/>
      <MoviesCarousel/>
      {/* <SectionNucleoIcons />*/}
      {/* <SectionDark /> */}
      <ContactUs/>
      {/* <SectionLogin /> */}
      {/* <SectionExamples /> */}
      <DemoFooter />
    </>
  );
}

export default LandingPage;
