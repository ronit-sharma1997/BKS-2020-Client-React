import React from "react";
import SearchForSale from "../Components/SearchForSale";
import Constants from "../Constants/Constants";
import HouseSearchItem from "../Components/HouseSearchItem";
import ForSaleMap from "../Components/ForSaleMap";

const houseConstants = Constants.getInstance();

export default class HomeSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-3">
            <div
              className="col-12 heading-text"
              style={{ color: "#000", fontSize: "40px" }}
            >
              Home Search
            </div>
          </div>
          <SearchForSale
            props={this.props}
            searchHomes={this.props.searchHomes}
          />
        </div>
        <div className="container">
          {!this.props.initialSearch && (
            <div className="row mt-2">
              <div className="col-12">
                {this.props.currentHomes && this.props.currentHomes.length}{" "}
                Results
              </div>
            </div>
          )}
          <ForSaleMap
            className="d-none d-md-block"
            houses={this.props.currentHomes}
          />
          <div className="row">
            {this.props.currentHomes &&
              this.props.currentHomes.map(function(house, index) {
                return (
                  <div className="col-md-4 col-12 mt-4" key={index}>
                    <HouseSearchItem
                      thumbnail={house.thumbnail}
                      address={houseConstants.getHouseAddress(house.address)}
                      beds={house.beds}
                      bathrooms={houseConstants.getBathroomCount(
                        house.baths_full,
                        house.baths_half
                      )}
                      price={houseConstants.getHousePrice(house.price)}
                      sqFt={house.lot_size ? house.lot_size.size : "0"}
                      houseId={house.property_id}
                      key={index}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
