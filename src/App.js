import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import MainPageContainer from "./Containers/MainPageContainer";
import AboutMeContainer from "./Containers/AboutMeContainer";
import HeaderNavBar from "./Components/HeaderNavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomeSearchContainer from "./Containers/HomeSearchContainer";
import HouseSearchDetailItem from "./Components/HouseSearchDetailItem";
import HomeForm from "./Components/HomeForm";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "./Components/ScrollToTop";
import SideNavBar from "./Components/SideNavBar";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

/**
 * Entry point for the Web App. Handles Routing to different components based on the current url.
 * @param {props} - properties passed from the reducer
 */
function App(props) {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);

  // handle scroll event
  const handleScroll = (elTopOffset, elHeight) => {
    if (window.pageYOffset > elTopOffset + elHeight + 100) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  /**
   * Define the Breakpoint of a Desktop or Laptop as a medium size screen
   */
  const isSmallSizeDevice = useMediaQuery({
    query: "(max-width: 795px)"
  });

  /**
   * Define Breakpoint to Display SearchForSale Component in Home Search Detail Item
   */
  const breakPoint = useMediaQuery({
    query: "(max-width: 991px)"
  });

  /**
   * Define Breakpoint to Display Tables in Home Search Detail Item
   */
  const breakPointTable = useMediaQuery({
    query: "(max-width: 480px)"
  });

  // add/remove scroll event listener
  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Route
          exact
          path={[
            "/",
            "/about-me",
            "/home-search",
            "/home-search/:id",
            "/what-is-my-home-worth",
            "/find-my-dream-home",
            "/contact-us"
          ]}
        >
          {!isSmallSizeDevice && (
            <div
              className={`fixed-header${sticky.isSticky ? " show-fixed" : ""}`}
              ref={headerRef}
            >
              <div className="container">
                <HeaderNavBar
                  isSticky={true}
                  isSmallSizeDevice={isSmallSizeDevice}
                  toggleSideNav={props.toggleSideNav}
                />
              </div>
            </div>
          )}
          {isSmallSizeDevice && <div ref={headerRef} />}
        </Route>
        <SideNavBar
          isSmallSizeDevice={isSmallSizeDevice}
          sideNavWidth={props.sideNavWidth}
          toggleSideNav={props.toggleSideNav}
        />
        <Route
          exact
          path={[
            "/",
            "/about-me",
            "/home-search",
            "/home-search/:id",
            "/what-is-my-home-worth",
            "/find-my-dream-home",
            "/contact-us"
          ]}
          render={otherProps => (
            <Header
              currentUrl={otherProps.match.url}
              history={otherProps.history}
              toggleSideNav={props.toggleSideNav}
              isSmallSizeDevice={isSmallSizeDevice}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={otherProps => (
            <MainPageContainer
              searchTerms={props.searchTerms}
              searchHomes={props.searchHomes}
              history={otherProps.history}
              currentUrl={otherProps.match.url}
            />
          )}
        />
        <Route exact path="/about-me" component={AboutMeContainer} />
        <Route
          exact
          path="/home-search"
          render={otherProps => (
            <HomeSearchContainer
              currentHomes={props.homes}
              searchTerms={props.searchTerms}
              searchHomes={props.searchHomes}
              initialSearch={props.initialSearch}
              isRefresh={props.isRefreshing}
              currentUrl={otherProps.match.url}
            />
          )}
        />
        <Route
          exact
          path="/home-search/:id"
          render={otherProps => (
            <HouseSearchDetailItem
              history={otherProps.history}
              houseId={otherProps.match.params.id}
              searchTerms={props.searchTerms}
              searchHomes={props.searchHomes}
              currentUrl={otherProps.match.url}
              breakPoint={breakPoint}
              isSmallSizeDevice={isSmallSizeDevice}
              breakPointTable={breakPointTable}
            />
          )}
        />
        <Route
          exact
          path={["/what-is-my-home-worth", "/find-my-dream-home"]}
          render={otherProps => <HomeForm currentUrl={otherProps.match.url} />}
        />
        <Route
          exact
          path={["/contact-us"]}
          render={otherProps => (
            <ContactUs
              searchTerms={props.searchTerms}
              currentUrl={otherProps.match.url}
            />
          )}
        />
        <Route
          exact
          path={[
            "/",
            "/about-me",
            "/home-search",
            "/home-search/:id",
            "/what-is-my-home-worth",
            "/find-my-dream-home",
            "/contact-us"
          ]}
          render={() => <Footer isSmallSizeDevice={isSmallSizeDevice} />}
        />
      </Router>
    </div>
  );
}

export default App;
