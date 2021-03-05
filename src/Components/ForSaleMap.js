import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Constants from "../Constants/Constants";
import { Link } from "react-router-dom";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const houseConstants = Constants.getInstance();

const ForSaleMap = ({ houses }) => {
  let renderResult =
    houses && houses.length > 0 ? (
      <MapContainer
        bounds={houseConstants.getHouseLocations(houses)}
        zoom={13}
        style={{ width: "100%", height: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {houses.map(house => {
          const houseCoord = houseConstants.getHouseLocation(house);
          const houseAddress = houseConstants.getHouseAddress(house.address);
          return (
            <Marker key={`marker-${houseCoord[1]}`} position={houseCoord}>
              <Popup>
                <div className="row">
                  <div className="col-12">
                    <Link to={`/home-search/${house.property_id}`}>
                      {`${houseAddress[0]} ${houseAddress[1]}`}
                    </Link>
                  </div>
                  <div className="col-8">
                    <img
                      className="w-100 h-100"
                      alt="House Thumbnail"
                      src={house.thumbnail}
                    />
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-12">${house.price}</div>
                      <div className="col-12">
                        Beds: {house.beds} Baths:
                        {houseConstants.getBathroomCount(
                          house.baths_full,
                          house.baths_half
                        )}
                      </div>
                      <div className="col-12">
                        Sq. Ft.: {house.lot_size ? house.lot_size.size : "0"}
                      </div>
                      <div className="col-12">Type: {house.prop_type}</div>
                      <div className="col-12">
                        MLS: {house.mls ? house.mls.id : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    ) : (
      <div></div>
    );
  return renderResult;
};
export default ForSaleMap;
