import { React, useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * Search For Sale Form used to search for properties based on input from the user.
 */
const SearchForSale = ({ props }) => {
  const [formState, setFormState] = useState(props.searchTerms);
  /**
   * Define the Breakpoint of a Desktop or Laptop as a medium size screen
   */
  const isSmallSizeDevice = useMediaQuery({
    query: "(max-width: 767px)"
  });

  const isHomePage = props.currentUrl === "/";
  const isHomeSearch = props.currentUrl === "/home-search";
  const isHomeSearchDetail = props.currentUrl.split("/").length === 3;

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function submitSearchRequest(event) {
    event.preventDefault();
    props.searchHomes(formState);
    if (isHomePage || isHomeSearchDetail) {
      props.history.push("/home-search");
    }
  }

  return (
    <div
      className="search-form-container"
      style={{ backgroundColor: "rgb(255,255,255,.9)", color: "black" }}
    >
      {(isHomePage || isHomeSearchDetail) && (
        <h3 className="search-form-heading">SEARCH FOR A HOME</h3>
      )}
      <form
        onSubmit={e => {
          submitSearchRequest(e);
        }}
      >
        <div className="row">
          <div
            className={`${
              isHomePage || isHomeSearchDetail ? "col-12" : "col-md-4 col-6"
            } `}
          >
            <div
              className={`form-group ml-4 ${
                isHomePage || isHomeSearchDetail ? "mr-4" : ""
              }`}
            >
              <label className="mt-2" htmlFor="inputCity">
                City
              </label>
              <select
                className="form-control"
                name="selectCity"
                id="inputCity"
                defaultValue={props.searchTerms.city}
                onChange={event => setInput("city", event.target.value)}
              >
                <option>Iselin</option>
                <option>Edison</option>
                <option>Woodbridge</option>
                <option>Colonia</option>
                <option>Fords</option>
                <option>Metuchen</option>
                <option>Middlesex</option>
                <option>East Brunswick</option>
                <option>North Brunswick</option>
                <option>Sayreville</option>
                <option>Somerset</option>
                <option>South Plainfield</option>
                <option>Monroe</option>
                <option>Princeton</option>
                <option>Jersey City</option>
                <option>Rumson</option>
              </select>
            </div>
          </div>
          {!isHomePage && !isHomeSearchDetail && (
            <div className="col-md-4 col-6">
              <div className={`form-group ${isSmallSizeDevice ? "mr-4" : ""}`}>
                <label className="mt-2" htmlFor="inputBedroom">
                  Bedrooms
                </label>
                <select
                  name="selectBedroom"
                  className="form-control"
                  id="inputBedroom"
                  defaultValue={`${props.searchTerms.bedrooms}+`}
                  onChange={event =>
                    setInput(
                      "bedrooms",
                      event.target.value.substring(
                        0,
                        event.target.value.length - 1
                      )
                    )
                  }
                >
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                  <option>6+</option>
                  <option>7+</option>
                </select>
              </div>
            </div>
          )}
          {!isHomePage && !isHomeSearchDetail && (
            <div className="col-md-4 col-6">
              <div
                className={`form-group ${isSmallSizeDevice ? "ml-4" : "mr-4"}`}
              >
                <label className="mt-2" htmlFor="inputBathroom">
                  Bathrooms
                </label>
                <select
                  name="selectBathroom"
                  className="form-control"
                  id="inputBathroom"
                  defaultValue={`${props.searchTerms.bathrooms}+`}
                  onChange={event =>
                    setInput(
                      "bathrooms",
                      event.target.value.substring(
                        0,
                        event.target.value.length - 1
                      )
                    )
                  }
                >
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                  <option>6+</option>
                  <option>7+</option>
                </select>
              </div>
            </div>
          )}
          {(isHomePage || isHomeSearchDetail) && (
            <div
              className={`${
                isHomePage || isHomeSearchDetail ? "col-6" : "col-4"
              } `}
            >
              <div className="form-group ml-4">
                <label className="mt-2" htmlFor="inputBedroom">
                  Bedrooms
                </label>
                <select
                  name="selectBedroom"
                  className="form-control"
                  id="inputBedroom"
                  defaultValue={`${props.searchTerms.bedrooms}+`}
                  onChange={event =>
                    setInput(
                      "bedrooms",
                      event.target.value.substring(
                        0,
                        event.target.value.length - 1
                      )
                    )
                  }
                >
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                  <option>6+</option>
                  <option>7+</option>
                </select>
              </div>
            </div>
          )}
          {(isHomePage || isHomeSearchDetail) && (
            <div className="col-6">
              <div className="form-group mr-4">
                <label className="mt-2" htmlFor="inputBathroom">
                  Bathrooms
                </label>
                <select
                  name="selectBathroom"
                  className="form-control"
                  id="inputBathroom"
                  defaultValue={`${props.searchTerms.bathrooms}+`}
                  onChange={event =>
                    setInput(
                      "bathrooms",
                      event.target.value.substring(
                        0,
                        event.target.value.length - 1
                      )
                    )
                  }
                >
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                  <option>6+</option>
                  <option>7+</option>
                </select>
              </div>
            </div>
          )}
          <div
            className={`${
              isHomePage || isHomeSearchDetail ? "col-12" : "col-md-4 col-6"
            } `}
          >
            <div
              className={`form-group ${
                isSmallSizeDevice
                  ? isHomeSearch
                    ? "mr-4"
                    : "ml-4 mr-4"
                  : isHomePage || isHomeSearchDetail
                  ? "ml-4 mr-4"
                  : "ml-4"
              }`}
            >
              <label className="mt-2" htmlFor="inputMinPrice">
                Min Price
              </label>
              <select
                name="selectMinPrice"
                className="form-control"
                id="inputMinPrice"
                defaultValue={`$${
                  props.searchTerms.minPrice.length === 6
                    ? [
                        props.searchTerms.minPrice.slice(0, 3),
                        ",",
                        props.searchTerms.minPrice.slice(3)
                      ].join("")
                    : [
                        props.searchTerms.minPrice.slice(0, 1),
                        ",",
                        props.searchTerms.minPrice.slice(1, 4),
                        ",",
                        props.searchTerms.minPrice.slice(4)
                      ].join("")
                }`}
                onChange={event =>
                  setInput(
                    "minPrice",
                    event.target.value
                      .substring(1, event.target.value.length)
                      .replaceAll(",", "")
                  )
                }
              >
                <option>$200,000</option>
                <option>$250,000</option>
                <option>$300,000</option>
                <option>$350,000</option>
                <option>$400,000</option>
                <option>$450,000</option>
                <option>$500,000</option>
                <option>$550,000</option>
                <option>$600,000</option>
                <option>$650,000</option>
                <option>$700,000</option>
                <option>$750,000</option>
                <option>$800,000</option>
                <option>$850,000</option>
                <option>$900,000</option>
                <option>$950,000</option>
                <option>$1,000,000</option>
              </select>
            </div>
          </div>
          <div
            className={`${
              isHomePage || isHomeSearchDetail ? "col-12" : "col-6 col-md-4"
            } `}
          >
            <div
              className={`form-group ${
                isSmallSizeDevice
                  ? isHomeSearch
                    ? "ml-4"
                    : "ml-4 mr-4"
                  : isHomePage || isHomeSearchDetail
                  ? "ml-4 mr-4"
                  : ""
              }`}
            >
              <label className="mt-2" htmlFor="inputMaxPrice">
                Max Price
              </label>
              <select
                name="selectMaxPrice"
                className="form-control"
                id="inputMaxPrice"
                defaultValue={`$${
                  props.searchTerms.maxPrice.length === 6
                    ? [
                        props.searchTerms.maxPrice.slice(0, 3),
                        ",",
                        props.searchTerms.maxPrice.slice(3)
                      ].join("")
                    : [
                        props.searchTerms.maxPrice.slice(0, 1),
                        ",",
                        props.searchTerms.maxPrice.slice(1, 4),
                        ",",
                        props.searchTerms.maxPrice.slice(4)
                      ].join("")
                }`}
                onChange={event =>
                  setInput(
                    "maxPrice",
                    event.target.value
                      .substring(1, event.target.value.length)
                      .replaceAll(",", "")
                  )
                }
              >
                <option>$200,000</option>
                <option>$250,000</option>
                <option>$300,000</option>
                <option>$350,000</option>
                <option>$400,000</option>
                <option>$450,000</option>
                <option>$500,000</option>
                <option>$550,000</option>
                <option>$600,000</option>
                <option>$650,000</option>
                <option>$700,000</option>
                <option>$750,000</option>
                <option>$800,000</option>
                <option>$850,000</option>
                <option>$900,000</option>
                <option>$950,000</option>
                <option>$1,000,000</option>
                <option>$1,500,000</option>
                <option>$2,000,000</option>
                <option>$2,500,000</option>
                <option>$3,000,000</option>
              </select>
            </div>
          </div>
          {!isHomePage && !isHomeSearchDetail && (
            <div className="col-6 col-md-4">
              <div className="form-group mr-4">
                <label className="mt-2" htmlFor="inputSqFt">
                  Min Sq. Ft
                </label>
                <select
                  type="text"
                  name="inputSqFt"
                  className="form-control"
                  id="inputSqFt"
                  defaultValue={`${props.searchTerms.minSqFt}+`}
                  onChange={event =>
                    setInput(
                      "minSqFt",
                      event.target.value.substring(
                        0,
                        event.target.value.length - 1
                      )
                    )
                  }
                >
                  <option>750+</option>
                  <option>1000+</option>
                  <option>1250+</option>
                  <option>1500+</option>
                  <option>1750+</option>
                  <option>2000+</option>
                  <option>2250+</option>
                  <option>2500+</option>
                  <option>2750+</option>
                  <option>3000+</option>
                  <option>3250+</option>
                  <option>3500+</option>
                  <option>3750+</option>
                  <option>5000+</option>
                  <option>7500+</option>
                </select>
              </div>
            </div>
          )}

          <div className="col-12 text-center">
            <button
              onClick={submitSearchRequest}
              className="btn btn-secondary"
              style={{ backgroundColor: "cadetblue", borderColor: "cadetblue" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForSale;
