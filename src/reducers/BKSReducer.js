const initialItems = {
  // isRefreshing: true,
  homes: [],
  searchTerms: {
    city: "Iselin",
    bedrooms: "1",
    bathrooms: "1",
    minPrice: "200000",
    maxPrice: "200000",
    minSqFt: "750"
  },
  initialSearch: true,
  sideNavWidth: "0px"
};

const BKSReducer = (state = initialItems, action) => {
  switch (action.type) {
    case "SET_HOMES":
      console.log(action.homes);
      return {
        ...state,
        homes: action.homes,
        initialSearch: false
      };
    case "SET_HOME_SEARCH_TERMS":
      return {
        ...state,
        searchTerms: action.searchTerms
      };
    case "TOGGLE_SIDE_NAV":
      console.log("toggling");
      return {
        ...state,
        sideNavWidth: state.sideNavWidth === "0px" ? "250px" : "0px"
      };

    default:
      return {
        ...state,
        homes: initialItems.homes,
        searchTerms: initialItems.searchTerms,
        initialSearch: initialItems.initialSearch,
        sideNavWidth: initialItems.sideNavWidth
      };
  }
};

export default BKSReducer;
