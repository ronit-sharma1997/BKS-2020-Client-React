import { connect } from "react-redux";
import App from "../App";
import AWSService from "../Services/AWSService";

const awsService = AWSService.getInstance();

const dispatchToPropertyMapper = dispatch => {
  return {
    searchHomes: searchTerm => {
      dispatch({ type: "SET_HOME_SEARCH_TERMS", searchTerms: searchTerm });
      awsService.getHouses(searchTerm, response => {
        dispatch({ type: "SET_HOMES", homes: response.body });
      });
    },
    toggleSideNav: () => {
      dispatch({ type: "TOGGLE_SIDE_NAV" });
    }
  };
};

const stateToPropertyMapper = state => {
  return {
    isRefreshing: state.isRefreshing,
    homes: state.homes,
    searchTerms: state.searchTerms,
    initialSearch: state.initialSearch,
    sideNavWidth: state.sideNavWidth
  };
};

const BKSContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(App);

export default BKSContainer;
