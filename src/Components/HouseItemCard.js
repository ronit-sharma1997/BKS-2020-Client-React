import React from "react";
import Constants from "../Constants/Constants";

var divStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const houseConstants = Constants.getInstance();

const HouseItemCard = ({ house }) => {
  return (
    <div className="col-12">
      <div style={{ position: "relative" }}>
        <img src={house.src} style={divStyle} alt="House Pic" />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            background: "rgba(95, 158, 160, 0.7)",
            color: "white",
            textAlign: "center",
            padding: "0 5px",
            width: "100%"
          }}
        >
          <b
            style={{
              fontWeight: "400",
              color: "#fff",
              textTransform: "uppercase",
              display: "inline-block",
              verticalAlign: "middle",
              lineHeight: "15px"
            }}
          >
            {houseConstants.getHouseAddress(house.address)[0]}
            <br />
            {houseConstants.getHouseAddress(house.address)[1]}
          </b>
          <b
            style={{
              fontWeight: "700",
              fontSize: "16px",
              color: "#fff",
              display: "block"
            }}
          >
            ${house.value}
          </b>
        </div>
      </div>
    </div>
  );
};
export default HouseItemCard;
